import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Optional,
  Self,
  ViewChild
} from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { ControlValueAccessor, FormBuilder, FormGroup, NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as moment from 'moment';

const MINUTE_MAX = 59;
const HOUR_MAX = 23;

/** Data structure for holding date. */
export class SdwFormTimeModel {
  constructor(public hour: string,
    public minute: string) {
  }

  get asValidString(): string | null {
    if (!this.hour || !this.minute) {
      return null;
    }
    const hourAsNumber = Number(this.hour);
    const minuteAsNumber = Number(this.minute);

    if (hourAsNumber < 0 || hourAsNumber > 24 || minuteAsNumber < 0 || minuteAsNumber > 59) {
      return null;
    }

    return `${this.hour}:${this.minute}`;
  }

  get isEmpty(): boolean {
    return !this.hour && !this.minute;
  }
}

@Component({
  selector: 'sdw-time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: SdwTimeInputComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.floating-placeholder]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy'
  }
})
export class SdwTimeInputComponent implements ControlValueAccessor, MatFormFieldControl<SdwFormTimeModel>, OnDestroy {
  static nextId = 0;

  @Input()
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  get placeholder(): string {
    return this._placeholder;
  }

  @Input()
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  get required(): boolean {
    return this._required;
  }

  @Input()
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.timeParts.disable() : this.timeParts.enable();
    this.stateChanges.next();
  }

  get disabled(): boolean {
    return this._disabled;
  }

  @Input()
  get value(): SdwFormTimeModel | null {
    const { value: { hour, minute } } = this.timeParts;
    return new SdwFormTimeModel(hour, minute);
  }

  set value(time: SdwFormTimeModel | null) {
    const { hour, minute } = time || new SdwFormTimeModel('', '');
    this._currentValidValues = this.value;
    this.timeParts.setValue({ hour, minute });
    this.stateChanges.next();
  }

  @Input() forceLabelFloat = false;

  @Input() highlightBgColor: string;

  timeParts: FormGroup;

  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'sdw-form-time';
  id = `sdw-inner-form-time-${SdwTimeInputComponent.nextId++}`;
  describedBy = '';

  get empty() {
    const { value: { hour, minute } } = this.timeParts;

    return !hour && !minute;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty || this.forceLabelFloat;
  }

  private _placeholder: string;
  private _required = false;
  private _disabled = false;

  @ViewChild('hourCtrl', { static: true, read: ElementRef })
  private _hourCtrl: ElementRef<HTMLInputElement>;

  @ViewChild('minuteCtrl', { static: true, read: ElementRef })
  private _minuteCtrl: ElementRef<HTMLInputElement>;

  private _currentValidValues = new SdwFormTimeModel('', '');

  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl) {

    this.timeParts = formBuilder.group({
      hour: '',
      minute: ''
    });

    _focusMonitor.monitor(_elementRef, true).subscribe(origin => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  onChange(_: any) {
  }

  onTouched() {
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      // tslint:disable-next-line:no-non-null-assertion
      this._elementRef.nativeElement.querySelector('input')!.focus();
    }
  }

  onMinuteKeyDown(event: KeyboardEvent) {
    this.onKeyDown(event,
      () => this.updateMinute(Number(this._currentValidValues.minute) + 1),
      () => this.updateMinute(Number(this._currentValidValues.minute) - 1)
    )
  }

  onHourKeyDown(event: KeyboardEvent) {
    this.onKeyDown(event,
      () => this.updateHour(Number(this._currentValidValues.hour) + 1),
      () => this.updateHour(Number(this._currentValidValues.hour) - 1)
    )
  }

  updateMinute(newValue: number) {
    if (newValue > MINUTE_MAX) {
      newValue = 0;
      this.updateHour(Number(this._currentValidValues.hour) + 1)
    }
    if (newValue < 0) {
      newValue = MINUTE_MAX;
      this.updateHour(Number(this._currentValidValues.hour) - 1)
    }
    this.value = new SdwFormTimeModel(this._currentValidValues.hour, `${newValue}`);
    this._handleInput();
  }

  updateHour(newValue: number) {
    if (newValue > HOUR_MAX) {
      newValue = 0;
    }
    if (newValue < 0) {
      newValue = HOUR_MAX;
    }
    this.value = new SdwFormTimeModel(`${newValue}`, this._currentValidValues.minute);
    this._handleInput();
  }


  onKeyDown(event: KeyboardEvent, incrementFn: Function, decrementFn: Function) {
    switch (event.key) {
      case "Down": // IE/Edge specific value
      case "ArrowDown":
        decrementFn();
        break;
      case "Up": // IE/Edge specific value
      case "ArrowUp":
        incrementFn()
        break;
    }
  }

  writeValue(date: SdwFormTimeModel | null): void {
    this.value = date;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  hourChangeOnBlur(newValue: string) {
    this.value = new SdwFormTimeModel(newValue, this._currentValidValues.minute);
    this.hourChange();
  }

  hourChange() {
    if (!this._resetIncorrectValues(this._hourCtrl.nativeElement, this._currentValidValues.hour, HOUR_MAX)) {
      this._handleInput();
    }
  }

  minuteChangeOnBlur(newValue: string) {
    this.value = new SdwFormTimeModel(this._currentValidValues.hour, newValue);
    this.minuteChange();
  }

  minuteChange() {
    if (!this._resetIncorrectValues(this._minuteCtrl.nativeElement, this._currentValidValues.minute, MINUTE_MAX)) {
      this._handleInput();
    }
  }

  private _handleInput(): void {
    this.onChange(this.value.asValidString);
    const { hour, minute } = this.value;
    this._currentValidValues = new SdwFormTimeModel(hour, minute);
  }

  private _resetIncorrectValues(ctrl: HTMLInputElement, prevValue: string, max: number): boolean {
    if (ctrl.value === '') {
      return false;
    }

    const currValue = Number(ctrl.value);

    if (isNaN(currValue) || currValue > max) {
      const selectionStart = ctrl.selectionStart - 1;

      ctrl.value = prevValue;
      ctrl.selectionStart = selectionStart;
      ctrl.selectionEnd = selectionStart;
      return true;
    }
    return false;
  }
}

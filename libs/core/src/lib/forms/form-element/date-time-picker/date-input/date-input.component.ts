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

/** Data structure for holding date. */
export class SdwFormDateModel {
  constructor(public day: string,
              public month: string,
              public year: string) {
  }

  get asIsoString(): string {
    if (!this.day || !this.month || !this.year || this.year.length !== 4) {
      return null;
    }

    const momentAusgang =
      moment.utc(`${Number(this.day)}-${Number(this.month)}-${Number(this.year)}`, 'D-M-YYYY');

    const validMoment = momentAusgang.isValid() ? momentAusgang : null;

    return validMoment ? validMoment.toISOString() : null;
  }
}

@Component({
  selector: 'sdw-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: DateInputComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.floating-placeholder]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy'
  }
})
export class DateInputComponent implements ControlValueAccessor, MatFormFieldControl<SdwFormDateModel>, OnDestroy {
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
    this._disabled ? this.dateParts.disable() : this.dateParts.enable();
    this.stateChanges.next();
  }

  get disabled(): boolean {
    return this._disabled;
  }

  @Input()
  get value(): SdwFormDateModel | null {
    const { value: { day, month, year } } = this.dateParts;
    return new SdwFormDateModel(day, month, year);
  }

  set value(date: SdwFormDateModel | null) {
    const { day, month, year } = date || new SdwFormDateModel('', '', '');
    this.dateParts.setValue({ day: day, month: month, year: year });
    this._currentValidValues = this.value;
    this.stateChanges.next();
  }

  @Input() valueAsUtc = true;

  @Input() spacerChar = '.';

  dateParts: FormGroup;

  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'sdw-form-date';
  id = `sdw-inner-form-date-${DateInputComponent.nextId++}`;
  describedBy = '';

  get empty() {
    const { value: { day, month, year } } = this.dateParts;

    return !day && !month && !year;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  private _placeholder: string;
  private _required = false;
  private _disabled = false;

  @ViewChild('dayCtrl', {static: true, read: ElementRef})
  private _dayCtrl: ElementRef<HTMLInputElement>;

  @ViewChild('monthCtrl', {static: true, read: ElementRef})
  private _monthCtrl: ElementRef<HTMLInputElement>;

  @ViewChild('yearCtrl', {static: true, read: ElementRef})
  private _yearCtrl: ElementRef<HTMLInputElement>;

  private _currentValidValues = new SdwFormDateModel('', '', '');

  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl) {

    this.dateParts = formBuilder.group({
      day: '',
      month: '',
      year: ''
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

  // TODO: Wenn Date und Time aktiv sind auf Date gehen
  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      // tslint:disable-next-line:no-non-null-assertion
      this._elementRef.nativeElement.querySelector('input')!.focus();
    }
  }

  writeValue(date: SdwFormDateModel | null): void {
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

  dayChange() {
    if (!this._resetIncorrectValues(this._dayCtrl.nativeElement, this._currentValidValues.day, 31)) {
      this._handleInput();

      if (this._dayCtrl.nativeElement.selectionStart === 2) {
        this._monthCtrl.nativeElement.focus();
      }
    }
  }

  monthChange() {
    if (!this._resetIncorrectValues(this._monthCtrl.nativeElement, this._currentValidValues.month, 12)) {
      this._handleInput();
    }
  }

  yearChange() {
    if (!this._resetIncorrectValues(this._yearCtrl.nativeElement, this._currentValidValues.year, 9999)) {
      this._handleInput();
    }
  }

  private _handleInput(): void {
    this.onChange(this.value.asIsoString);
    this._currentValidValues = this.value;
  }

  private _resetIncorrectValues(ctrl: HTMLInputElement, prevValue: string, max: number): boolean {
    if (ctrl.value === '') {
      return false;
    }

    const currValue = Number(ctrl.value);

    if (isNaN(currValue) || currValue > max || (ctrl.value === '00' && currValue === 0)) {
      const selectionStart = ctrl.selectionStart - 1;

      ctrl.value = prevValue;
      ctrl.selectionStart = selectionStart;
      ctrl.selectionEnd = selectionStart;
      return true;
    }
    return false;
  }
}

import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Optional,
  Self,
  ViewChild
} from '@angular/core';
import {MatFormFieldControl} from '@angular/material/form-field';
import {ControlValueAccessor, FormBuilder, FormGroup, NgControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {SdwDateInputComponent} from '../date-input/date-input.component';
import {SdwTimeInputComponent} from '../time-input/time-input.component';

import * as moment from 'moment';
import {takeUntil} from 'rxjs/operators';

/** Data structure for holding date. */
export class SdwFormDateTimeModel {
  constructor(public date: string,
              public time: string) {
  }

  get asValidString(): string | null {
    if (!this.date || !this.time) {
      return null;
    }

    const [hour, minute] = this.time.split(':');

    const momentDate = moment.utc(this.date);
    const validDateTime = momentDate.add(hour, 'hour').add(minute, 'minute').toISOString();
    return validDateTime;
  }
}

@Component({
  selector: 'sdw-date-time-input',
  templateUrl: './date-time-input.component.html',
  styleUrls: ['./date-time-input.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: SdwDateTimeInputComponent}],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.floating-placeholder]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy'
  }
})
export class SdwDateTimeInputComponent implements ControlValueAccessor, MatFormFieldControl<SdwFormDateTimeModel>, OnDestroy {
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
    this._disabled ? this.dateTimeParts.disable() : this.dateTimeParts.enable();
    this.stateChanges.next();
  }

  get disabled(): boolean {
    return this._disabled;
  }

  @Input()
  get value(): SdwFormDateTimeModel | null {
    const {value: {date, time}} = this.dateTimeParts;
    return new SdwFormDateTimeModel(date, time);
  }

  set value(dateTime: SdwFormDateTimeModel | null) {
    const {date, time} = dateTime || new SdwFormDateTimeModel('', '');

    this.dateTimeParts.setValue({date: date, time: time});
    this.stateChanges.next();
  }

  @Input() highlightBgColor: string;

  dateTimeParts: FormGroup;

  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'sdw-form-date-time';
  id = `sdw-inner-form-date-time-${SdwDateTimeInputComponent.nextId++}`;
  describedBy = '';

  get empty() {
    const dateVal = this._dateCtrl.value;
    const timeVal = this._timeCtrl.value;

    return dateVal.isEmpty && timeVal.isEmpty;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  private _placeholder: string;
  private _required = false;
  private _disabled = false;

  @ViewChild('dateCtrl', {static: true, read: SdwDateInputComponent})
  private _dateCtrl: SdwDateInputComponent;

  @ViewChild('timeCtrl', {static: true, read: SdwTimeInputComponent})
  private _timeCtrl: SdwTimeInputComponent;

  private _destroyed$ = new Subject();

  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    private _cd: ChangeDetectorRef,
    @Optional() @Self() public ngControl: NgControl) {

    this.dateTimeParts = formBuilder.group({
      date: '',
      time: ''
    });

    _focusMonitor.monitor(_elementRef, true).subscribe(origin => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();
    });

    this.stateChanges.pipe(
      takeUntil(this._destroyed$)
    ).subscribe(_ => {
      this._dateCtrl.stateChanges.next();
      this._timeCtrl.stateChanges.next();
      this._cd.markForCheck();
    });

    this.dateTimeParts.valueChanges.pipe(
      takeUntil(this._destroyed$)
    ).subscribe(_ => {
      this._handleInput();
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
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

  writeValue(date: SdwFormDateTimeModel | null): void {
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

  private _handleInput(): void {
    this.onChange(this.value.asValidString);
  }
}

import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, Inject, Input, Optional, ViewChild
} from '@angular/core';
import {SdwFormMaterialElementComponent} from '../form-mat-element.component';
import {SdwFormComponent} from '../../form.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from '@angular/material/form-field';
import {DateInputComponent} from './date-input/date-input.component';
import {TimeInputComponent} from './time-input/time-input.component';
import {DateTimeInputComponent} from './date-time-input/date-time-input.component';

@Component({
  selector: 'sdw-form-date-time-picker, [sdw-form-date-time-picker]',
  templateUrl: './form-date-time-picker.component.html',
  styleUrls: ['./form-date-time-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'sdw-form-elements sdw-form-date-time-picker',
  }
})

export class SdwFormDateTimePickerComponent<D> extends SdwFormMaterialElementComponent {
  @Input() showDate = true;
  @Input() showTime = true;

  @Input() highlightBgColor: string;

  @ViewChild(DateInputComponent, {static: true}) readonly dateComponent: DateInputComponent;
  @ViewChild(TimeInputComponent, {static: true}) readonly timeComponent: TimeInputComponent;
  @ViewChild(DateTimeInputComponent, {static: true}) readonly dateTimeComponent: DateTimeInputComponent;

  constructor(form: SdwFormComponent,
              cd: ChangeDetectorRef,
              @Optional() @Inject(MAT_FORM_FIELD_DEFAULT_OPTIONS) _formFieldOptions: MatFormFieldDefaultOptions) {
    super(form, cd, _formFieldOptions);
  }
}

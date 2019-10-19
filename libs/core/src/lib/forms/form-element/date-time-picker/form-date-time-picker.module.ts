import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SdwFormDateTimePickerComponent,
  SdwFormDateTimeSuffixTemplateDirective
} from './form-date-time-picker.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { DateInputComponent } from './date-input/date-input.component';
import { SwitchableInputDirective } from './switchable-input.directive';
import { TimeInputComponent } from './time-input/time-input.component';
import { DateTimeInputComponent } from './date-time-input/date-time-input.component';

@NgModule({
  declarations: [
    SdwFormDateTimePickerComponent,
    DateInputComponent,
    TimeInputComponent,
    DateTimeInputComponent,
    SdwFormDateTimeSuffixTemplateDirective,
    SwitchableInputDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [
    SdwFormDateTimePickerComponent
  ],
  entryComponents: [SdwFormDateTimePickerComponent]
})
export class SdwFormDateTimePickerModule { }

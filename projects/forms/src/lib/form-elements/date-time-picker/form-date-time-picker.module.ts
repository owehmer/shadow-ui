import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SdwFormDateTimePickerComponent,
} from './form-date-time-picker.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { SdwDateInputComponent } from './date-input/date-input.component';
import { SwitchableInputDirective } from './switchable-input.directive';
import { SdwTimeInputComponent } from './time-input/time-input.component';
import { SdwDateTimeInputComponent } from './date-time-input/date-time-input.component';

@NgModule({
  declarations: [
    SdwFormDateTimePickerComponent,
    SdwDateInputComponent,
    SdwTimeInputComponent,
    SdwDateTimeInputComponent,
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

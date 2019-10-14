import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdwFormDatepickerComponent, SdwFormDatepicketButtonTemplateDirective } from './form-datepicker.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SdwFormDatepickerComponent, SdwFormDatepicketButtonTemplateDirective],
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
    SdwFormDatepickerComponent, SdwFormDatepicketButtonTemplateDirective
  ],
  entryComponents: [SdwFormDatepickerComponent]
})
export class SdwFormDatepickerModule { }

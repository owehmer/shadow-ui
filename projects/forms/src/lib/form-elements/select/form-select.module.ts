import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdwFormSelectComponent, SdwFormSelectTemplateDirective } from './form-select.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [SdwFormSelectComponent, SdwFormSelectTemplateDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  exports: [
    SdwFormSelectComponent, SdwFormSelectTemplateDirective
  ],
  entryComponents: [SdwFormSelectComponent]
})
export class SdwFormSelectModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdwFormRadioComponent, SdwFormRadioTemplateDirective } from './form-radio.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [SdwFormRadioComponent, SdwFormRadioTemplateDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRadioModule
  ],
  exports: [
    SdwFormRadioComponent, SdwFormRadioTemplateDirective
  ],
  entryComponents: [SdwFormRadioComponent]
})
export class SdwFormRadioModule { }

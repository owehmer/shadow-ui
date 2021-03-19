import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdwFormCheckboxComponent } from './form-checkbox.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [SdwFormCheckboxComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  exports: [
    SdwFormCheckboxComponent,
  ],
  entryComponents: [SdwFormCheckboxComponent]
})
export class SdwFormCheckboxModule { }

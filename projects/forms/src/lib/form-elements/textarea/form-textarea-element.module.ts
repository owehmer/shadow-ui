import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdwFormTextareaElementComponent } from './form-textarea-element.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SdwFormTextareaElementComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    SdwFormTextareaElementComponent,
  ],
  entryComponents: [SdwFormTextareaElementComponent]
})
export class SdwFormTextareaElementModule { }

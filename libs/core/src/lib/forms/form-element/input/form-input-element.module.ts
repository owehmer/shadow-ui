import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdwFormInputElementComponent } from './form-input-element.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SdwFormInputElementComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    SdwFormInputElementComponent,
  ],
  entryComponents: [SdwFormInputElementComponent]
})
export class SdwFormInputElementModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdwFormInputElementComponent } from './form-input-element.component';
import { SdwFormInputDirective } from './form-input.directive';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SdwFormInputElementComponent, SdwFormInputDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    SdwFormInputElementComponent,
    SdwFormInputDirective
  ],
  entryComponents: [SdwFormInputElementComponent]
})
export class FormInputElementModule { }

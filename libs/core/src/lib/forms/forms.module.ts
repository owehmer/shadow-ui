import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SdwFormComponent } from './form/form.component';
import { SdwFormElementComponent } from './form-element/form-element.component';
import { FormInputElementModule } from './form-element/form-input-element/form-input-element.module';
import { PortalModule } from '@angular/cdk/portal';
import { SdwFormDynamicElementComponent } from './form-element/form-dynamic-element/form-dynamic-element.component';

@NgModule({
  declarations: [SdwFormComponent, SdwFormElementComponent, SdwFormDynamicElementComponent],
  imports: [
    CommonModule,
    FormsModule,
    PortalModule,
    ReactiveFormsModule,
    FormInputElementModule,
  ],
  exports: [
    SdwFormComponent,
    SdwFormElementComponent
  ]
})
export class SdwFormsModule { }

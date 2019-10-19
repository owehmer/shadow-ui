import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SdwFormComponent } from './form/form.component';
import { SdwFormInputElementModule } from './form-element/input/form-input-element.module';
import { PortalModule } from '@angular/cdk/portal';
import { SdwFormDynamicElementComponent } from './form-element/dynamic/form-dynamic-element.component';
import { SdwFormCheckboxModule } from './form-element/checkbox/form-checkbox.module';
import {
  SdwFormMaterialElementComponent,
  SdwFormSuffixTemplateDirective
} from './form-element/form-mat-element.component';
import { SdwFormSelectModule } from './form-element/select/form-select.module';
import { SdwFormElementComponent } from './form-element/form-element.component';

@NgModule({
  declarations: [
    SdwFormComponent,
    SdwFormElementComponent,
    SdwFormMaterialElementComponent,
    SdwFormDynamicElementComponent,
    SdwFormSuffixTemplateDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PortalModule,
    ReactiveFormsModule,
    SdwFormInputElementModule,
    SdwFormCheckboxModule,
    SdwFormSelectModule
  ],
  exports: [
    SdwFormComponent
  ]
})
export class SdwFormsModule {
}

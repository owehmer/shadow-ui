import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SdwFormComponent } from './form.component';
import { PortalModule } from '@angular/cdk/portal';
import { SdwFormDynamicElementComponent } from './form-elements/form-dynamic-element.component';
import {
  SdwFormMaterialElementComponent,
  SdwFormSuffixTemplateDirective
} from './form-elements/form-mat-element.component';
import { SdwFormElementComponent } from './form-elements/form-element.component';

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
    ReactiveFormsModule
  ],
  exports: [
    SdwFormComponent
  ]
})
export class SdwFormsModule {
}

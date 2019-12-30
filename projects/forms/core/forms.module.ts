import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SdwFormComponent } from './form.component';
import { PortalModule } from '@angular/cdk/portal';
import { SdwFormElementComponent } from './form-element.component';
import { SdwFormMaterialElementComponent, SdwFormSuffixTemplateDirective } from './form-mat-element.component';
import { SdwFormDynamicElementComponent } from './form-dynamic-element.component';

@NgModule({
  declarations: [
    SdwFormComponent,
    SdwFormElementComponent,
    SdwFormMaterialElementComponent,
    SdwFormDynamicElementComponent,
    SdwFormSuffixTemplateDirective
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

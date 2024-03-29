import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MyContentComponent } from './dialog-demo/my-content/my-content.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MyContentComponentShort } from './dialog-demo/my-content-short/my-content-short.component';
import { DynamicComponent } from './dialog-demo/dynamic/dynamic.component';
import { FormOneComponent } from './dialog-demo/form-dlgs/form-one/form-one.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AllDemosComponent } from './all-demos/all-demos.component';
import { DialogDemoComponent } from './dialog-demo/dialog-demo/dialog-demo.component';
import { FormDemoComponent } from './forms-demo/form-demo.component';
import {
  SdwFormCheckboxModule,
  SdwFormDatepickerModule, SdwFormDateTimePickerModule,
  SdwFormInputElementModule,
  SdwFormRadioModule,
  SdwFormSelectModule,
  SdwFormsModule,
  SdwFormTextareaElementModule
} from '@shadowui/forms';
import { SdwDialogModule } from '@shadowui/dialog';
import { FormLayoutComponent } from './form-layout/form-layout.component';
import { SdwDynGridModule } from '@shadowui/utils';

@NgModule({
  declarations: [
    AppComponent,
    MyContentComponent,
    MyContentComponentShort,
    DynamicComponent,
    FormOneComponent,
    AllDemosComponent,
    DialogDemoComponent,
    FormDemoComponent,
    FormLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SdwDialogModule,
    SdwFormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
    { path: 'dialog', component: DialogDemoComponent },
    { path: 'form', component: FormDemoComponent },
    { path: 'form-layout', component: FormLayoutComponent },
    { path: '**', component: AllDemosComponent }
], { relativeLinkResolution: 'legacy' }),

    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,

    SdwFormCheckboxModule,
    SdwFormDateTimePickerModule,
    SdwFormDatepickerModule,
    SdwFormInputElementModule,
    SdwFormRadioModule,
    SdwFormSelectModule,
    SdwDynGridModule,
    SdwFormTextareaElementModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    MyContentComponent,
    MyContentComponentShort,
    DynamicComponent,
    FormOneComponent
  ]
})
export class AppModule {
}

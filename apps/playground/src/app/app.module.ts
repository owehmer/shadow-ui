import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MyContentComponent } from './dialog-demo/my-content/my-content.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SdwDialogModule, SdwFormsModule } from '@shadow-ui/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MyContentComponentShort } from './dialog-demo/my-content-short/my-content-short.component';
import { DynamicComponent } from './dialog-demo/dynamic/dynamic.component';
import { FormOneComponent } from './dialog-demo/form-dlgs/form-one/form-one.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { AllDemosComponent } from './all-demos/all-demos.component';
import { DialogDemoComponent } from './dialog-demo/dialog-demo/dialog-demo.component';
import { FormDemoComponent } from './forms-demo/form-demo/form-demo.component';
import { SdwFormInputElementModule } from '../../../../libs/core/src/lib/forms/form-element/input/form-input-element.module';
import { SdwFormCheckboxModule } from '../../../../libs/core/src/lib/forms/form-element/checkbox/form-checkbox.module';
import { SdwFormSelectModule } from '../../../../libs/core/src/lib/forms/form-element/select/form-select.module';
import { SdwFormRadioModule } from '../../../../libs/core/src/lib/forms/form-element/radio/form-radio.module';
import { SdwFormDatepickerModule } from '../../../../libs/core/src/lib/forms/form-element/datepicker/form-datepicker.module';
import { SdwFormDateTimePickerModule } from '../../../../libs/core/src/lib/forms/form-element/date-time-picker/form-date-time-picker.module';

@NgModule({
  declarations: [AppComponent, MyContentComponent, MyContentComponentShort, DynamicComponent, FormOneComponent, AllDemosComponent, DialogDemoComponent, FormDemoComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SdwDialogModule,
    SdwFormsModule,
    SdwFormInputElementModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'dialog', component: DialogDemoComponent },
      { path: 'form', component: FormDemoComponent },
      { path: '**', component: AllDemosComponent }
    ]),

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    SdwFormCheckboxModule,
    SdwFormSelectModule,
    SdwFormRadioModule,
    SdwFormDatepickerModule,
    SdwFormDateTimePickerModule
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
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MyContentComponent } from './dialog-demo/my-content/my-content.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SdwDialogModule } from '@shadow-ui/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MyContentComponentShort } from './dialog-demo/my-content-short/my-content-short.component';
import { DynamicComponent } from './dialog-demo/dynamic/dynamic.component';
import { FormOneComponent } from './form-dlgs/form-one/form-one.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
  declarations: [AppComponent, MyContentComponent, MyContentComponentShort, DynamicComponent, FormOneComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SdwDialogModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule
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

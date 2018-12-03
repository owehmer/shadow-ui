import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MyContentComponent } from './my-content/my-content.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShadowUiDialogModule } from '@shadow-ui/dialog';

@NgModule({
  declarations: [AppComponent, MyContentComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ShadowUiDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    MyContentComponent
  ]
})
export class AppModule {}

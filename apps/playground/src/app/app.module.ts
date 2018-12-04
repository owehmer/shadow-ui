import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MyContentComponent } from './my-content/my-content.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SdwDialogModule } from '@shadow-ui/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [AppComponent, MyContentComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SdwDialogModule,

    MatButtonModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    MyContentComponent
  ]
})
export class AppModule {}

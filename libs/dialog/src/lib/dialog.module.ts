import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { PortalModule } from '@angular/cdk/portal';
import { SimpleDialogComponent } from './simple-dialog/simple-dialog.component';
import { MaterialDialogModule } from './material-dialog/material-dialog.module';

const COMPS = [
  SimpleDialogComponent
];

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    PortalModule,
    MaterialDialogModule
  ],
  declarations: [COMPS],
  entryComponents: [COMPS]
})
export class ShadowUiDialogModule {
}

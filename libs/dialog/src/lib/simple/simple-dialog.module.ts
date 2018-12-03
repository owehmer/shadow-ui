import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PortalModule } from '@angular/cdk/portal';
import { SdwSimpleDialogComponent } from './simple-dialog.component';

const MATERIAL = [
  MatDialogModule,
  MatButtonModule,
];

const CDK = [
  PortalModule
];

@NgModule({
  imports: [
    CommonModule,
    MATERIAL,
    CDK
  ],
  declarations: [SdwSimpleDialogComponent],
  entryComponents: [SdwSimpleDialogComponent]
})
export class SdwSimpleDialogModule {
}

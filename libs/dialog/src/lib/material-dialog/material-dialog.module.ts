import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { PortalModule } from '@angular/cdk/portal';
import { MaterialDialogComponent } from './material-dialog.component';

const MATERIAL = [
  MatDialogModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule
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
  declarations: [MaterialDialogComponent],
  entryComponents: [MaterialDialogComponent]
})
export class MaterialDialogModule {
}

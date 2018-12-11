import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { PortalModule } from '@angular/cdk/portal';
import { SdwStepDialogComponent } from './step-dialog.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const MATERIAL = [
  MatDialogModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule
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
  declarations: [SdwStepDialogComponent],
  entryComponents: [SdwStepDialogComponent]
})
export class SdwStepDialogModule {
}

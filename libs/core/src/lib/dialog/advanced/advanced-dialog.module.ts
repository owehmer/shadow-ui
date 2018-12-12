import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { PortalModule } from '@angular/cdk/portal';
import { SdwAdvancedDialogComponent } from './advanced-dialog.component';
import { SdwTitleBarComponent } from '../title-bar/title-bar.component';

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
  declarations: [
    SdwAdvancedDialogComponent,
    SdwTitleBarComponent
  ],
  exports: [
    SdwAdvancedDialogComponent,
    SdwTitleBarComponent
  ],
  entryComponents: [SdwAdvancedDialogComponent]
})
export class SdwAdvancedDialogModule {
}

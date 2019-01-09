import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalModule } from '@angular/cdk/portal';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';

import { SdwTitleBarComponent } from './blocks/title-bar/title-bar.component';
import { SdwFooterComponent } from './blocks/footer/footer.component';
import { SdwContentComponent } from './blocks/content/content.component';

import { SdwAdvancedDialogComponent } from './advanced/advanced-dialog.component';
import { SdwStepDialogComponent } from './step/step-dialog.component';
import { SdwExtendedOkComponent } from './blocks/extended-ok/extended-ok.component';
import { MatMenuModule } from '@angular/material/menu';

const MATERIAL = [
  MatDialogModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatStepperModule,
  MatMenuModule
];

const CDK = [
  PortalModule
];

export const BUILDING_BLOCKS = [
  SdwTitleBarComponent,
  SdwFooterComponent,
  SdwContentComponent,
  SdwExtendedOkComponent
];

export const DIALOG_TYPES = [
  SdwAdvancedDialogComponent,
  SdwStepDialogComponent
];

@NgModule({
  imports: [
    CommonModule,
    MATERIAL,
    CDK,
  ],
  declarations: [
    BUILDING_BLOCKS,
    DIALOG_TYPES
  ],
  exports: [
    BUILDING_BLOCKS,
    DIALOG_TYPES
  ],
  entryComponents: [
    DIALOG_TYPES
  ]
})
export class SdwDialogModule {
}

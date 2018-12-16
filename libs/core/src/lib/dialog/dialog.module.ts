import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { PortalModule } from '@angular/cdk/portal';

import { SdwTitleBarComponent } from './blocks/title-bar/title-bar.component';
import { SdwFooterComponent } from './blocks/footer/footer.component';
import { SdwContentComponent } from './blocks/content/content.component';

import { SdwStepDialogModule } from './step/step-dialog.module';
import { SdwAdvancedDialogComponent } from './advanced/advanced-dialog.component';
import { CommonModule } from '@angular/common';

const MATERIAL = [
  MatDialogModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule
];

const CDK = [
  PortalModule
];

export const BUILDING_BLOCKS = [
  SdwTitleBarComponent,
  SdwFooterComponent,
  SdwContentComponent
];

export const DIALOG_TYPES = [
  SdwAdvancedDialogComponent
];

@NgModule({
  imports: [
    CommonModule,
    MATERIAL,
    CDK,
    SdwStepDialogModule
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

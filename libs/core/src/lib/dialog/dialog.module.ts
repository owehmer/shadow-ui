import { NgModule } from '@angular/core';
import { SdwAdvancedDialogModule } from './advanced/advanced-dialog.module';
import { SdwSimpleDialogModule } from './simple/simple-dialog.module';
import { SdwStepDialogModule } from './step/step-dialog.module';

@NgModule({
  imports: [
    SdwSimpleDialogModule,
    SdwAdvancedDialogModule,
    SdwStepDialogModule
  ]
})
export class SdwDialogModule {
}

import { NgModule } from '@angular/core';
import { SdwAdvancedDialogModule } from './advanced/advanced-dialog.module';
import { SdwSimpleDialogModule } from './simple/simple-dialog.module';

@NgModule({
  imports: [
    SdwSimpleDialogModule,
    SdwAdvancedDialogModule
  ]
})
export class SdwDialogModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdwDynGridContainerDirective, SdwDynGridDirective } from './dyn-grid.directive';

@NgModule({
  declarations: [SdwDynGridContainerDirective, SdwDynGridDirective],
  imports: [
    CommonModule
  ],
  exports: [SdwDynGridContainerDirective, SdwDynGridDirective]
})
export class SdwDynGridModule { }

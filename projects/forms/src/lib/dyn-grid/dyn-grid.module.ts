import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynGridContainerDirective, DynGridDirective } from './dyn-grid.directive';

@NgModule({
  declarations: [DynGridContainerDirective, DynGridDirective],
  imports: [
    CommonModule
  ],
  exports: [DynGridContainerDirective, DynGridDirective]
})
export class DynGridModule { }

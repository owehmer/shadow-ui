import { Component, HostListener } from '@angular/core';
import { Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'shadow-ui-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent {
  private contentIsValid = false;

  constructor() {
  }

  @HostListener('click')
  private clicked() {
    // this.dlg.insertStep(1, {
    //   title: 'SUPER DYN',
    //   subtitle: '2nd subtitle',
    //   component: DynamicComponent
    // });

  }
}

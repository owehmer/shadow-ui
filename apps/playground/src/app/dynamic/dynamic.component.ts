import { Component, HostListener } from '@angular/core';
import { SdwStepDialogComponent } from '@shadow-ui/core';

@Component({
  selector: 'shadow-ui-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent {
  constructor(private dlg: SdwStepDialogComponent) {
  }

  @HostListener('click')
  private clicked() {
    this.dlg.insertStep(1, {
      title: 'SUPER DYN',
      subtitle: '2nd subtitle',
      component: DynamicComponent
    });
  }
}

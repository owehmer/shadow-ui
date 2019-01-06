import { Component, HostListener } from '@angular/core';
import { DialogWithValidation, SdwStepDialogComponent } from '@shadow-ui/core';

@Component({
  selector: 'shadow-ui-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent implements DialogWithValidation {
  private contentIsValid = false;

  constructor(private dlg: SdwStepDialogComponent) {
  }

  isValid(): boolean {
    this.dlg.changeStepSubtitle(this, 'test');
    return this.contentIsValid;
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

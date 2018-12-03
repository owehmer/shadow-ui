import { ComponentRef, Injector, OnDestroy, TemplateRef } from '@angular/core';
import { CdkPortalOutlet, ComponentPortal, ComponentType, TemplatePortal } from '@angular/cdk/portal';
import { MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';

export class GenericDialogBase implements OnDestroy {
  protected _destroyed = new Subject();

  constructor(protected dialogRef: MatDialogRef<any>) {
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  protected generateComponentInOutlet(compOrTemp: ComponentType<any> | TemplateRef<any>,
                                      outlet: CdkPortalOutlet,
                                      injector: Injector,
                                      data: any): ComponentRef<any> {
    const componentOrTemplateRef = compOrTemp;

    if (componentOrTemplateRef instanceof TemplateRef){
      outlet.attachTemplatePortal(
        new TemplatePortal<any>(componentOrTemplateRef, null,
          { $implicit: data, dialogRef: this.dialogRef }));
    } else {
      const contentRef = outlet.attachComponentPortal<any>(
        new ComponentPortal(componentOrTemplateRef, undefined, injector));

      return contentRef;
    }
  }

  protected closeDialog(returnValue: any = null) {
    this.dialogRef.close(returnValue);
  }
}

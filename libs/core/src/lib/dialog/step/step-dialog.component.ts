import {
  ChangeDetectionStrategy,
  Component, ComponentRef,
  ElementRef, HostBinding, HostListener,
  Inject,
  Injector,
  OnInit, QueryList, ViewChild, ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  SdwAdvancedDialogBuilder,
  SdwAdvancedDialogComponent,
  SdwAdvancedDialogData
} from '../advanced/advanced-dialog.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CdkPortalOutlet, PortalInjector } from '@angular/cdk/portal';
import { dlgHasChanges } from '../dialog-content-api';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

export class SdwStepDialogBuilder<C = any, D = any, R = any> extends SdwAdvancedDialogBuilder {
  open(): MatDialogRef<SdwStepDialogComponent, R> {
    if (this._config.panelClass == null || this._config.panelClass === '')
      this.setPanelClasses();
    return this._dialogService.open<SdwStepDialogComponent, SdwAdvancedDialogData<C, D>, R>(SdwStepDialogComponent, this._config);
  }
}

@Component({
  selector: 'sdw-step-dialog',
  templateUrl: './step-dialog.component.html',
  styleUrls: ['./step-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'sdw-step-dialog',
    'tabindex': '-1'
  }
})
export class SdwStepDialogComponent extends SdwAdvancedDialogComponent implements OnInit {
  public data = [
    'Erste Seite',
    '<div>Nur ein step</div><div>Nur ein step</div><div>Nur ein step</div><div>Nur ein step</div>'
  ];

  public get currentHeight() {
    const height = this._stepElems && this._stepElems.length > 0
      ? this._stepElems.toArray()[this._currentSelectedStepIndex].nativeElement.clientHeight
      : 0;
    console.warn('height', height);
    return height === 0 ? undefined : height + 96; //  TODO: overflow während animation + danach wieder wegnehmen
  }
  //
  // public get secondHeight() {
  //   const height = this._testStepTwo.nativeElement.clientHeight;
  //   console.warn('second h', height);
  //   return height === 0 ? undefined : height;
  // }

  @ViewChildren(CdkPortalOutlet)
  private _outlets: QueryList<CdkPortalOutlet>;

  @ViewChildren('step', { read: ElementRef })
  private _stepElems: QueryList<ElementRef>;

  private _componentRefs: ComponentRef<any>[];

  private _currentSelectedStepIndex = 0;

  @HostListener('click')
  private test() {
    console.warn('step', this._stepElems.toArray());
  }

  constructor(protected dlgService: MatDialog,
              protected dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) protected dlgData: SdwAdvancedDialogData,
              protected _injector: Injector,
              protected _bpObserver: BreakpointObserver,
              protected _elemRef: ElementRef) {
    super(dlgService, dialogRef as MatDialogRef<any>, dlgData, _injector, _bpObserver, _elemRef);
  }

  ngOnInit() {
    const parentInjector = this.dlgData.injector ? this.dlgData.injector : this._injector;
    const dialogInjector = new PortalInjector(parentInjector, new WeakMap<any, any>([
      [MAT_DIALOG_DATA, this.dlgData.data]
    ]));
    //
    // this._componentRef = this.generateComponentInOutlet(
    //   this.dlgData.component,
    //   this._outlet,
    //   dialogInjector,
    //   this.dlgData.data
    // );
    //
    // this._changes$$ = dlgHasChanges(this._componentRef.instance,
    //   (val) => this.contentChanged = val);

    this.fullscreenOnMobile$.next(this.dlgData.fullscreenOnMobile || true);
  }

  stepChanged(event: StepperSelectionEvent) {
    console.warn('event', event);
    this._currentSelectedStepIndex = event.selectedIndex;
  }

}

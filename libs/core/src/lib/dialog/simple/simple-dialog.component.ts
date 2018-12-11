import {
  ChangeDetectionStrategy,
  Component, ComponentRef,
  Inject,
  Injector,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { CdkPortalOutlet, ComponentType, PortalInjector } from '@angular/cdk/portal';
import { SdwDialogBuilder } from '../dialog-builder';
import { SdwDialogBase } from '../dialog-base';
import { dlgAbortFn, dlgGetResult, dlgOkFn } from '../dialog-internal-api';
import { determineValue } from '../helper';
import { SdwCloseMode, SdwDialogCloseResult } from '../dialog-content-api';

export class SdwSimpleDialogData<C = any, D = any> {
  data: D = null;
  disableClose = false; // Use own property to control the return value of the dialog
  component: ComponentType<C> | TemplateRef<C> | null;
  showAbortBtn = true;
  abortBtnText = 'Abort';
  showOkBtn = true;
  okBtnText = 'Save';
  title = '';
  text: string | null;

  constructor(data: Partial<SdwSimpleDialogData> = {}) {
    Object.assign(this, data);
  }
}

/**
 * @param C Component you want as your content
 * @param D Type of data you want to access in your content component
 * @param R
 */
export class SdwSimpleDialogBuilder<C = any, D = any, R = any> extends SdwDialogBuilder {
  protected _config: MatDialogConfig<SdwSimpleDialogData>;

  protected get data(): SdwSimpleDialogData<C, D> {
    return this._config.data;
  }

  constructor(dialogService: MatDialog, _config: MatDialogConfig<SdwSimpleDialogData> = null) {
    super(dialogService, _config);
    this._config.data = new SdwSimpleDialogData<C, D>();
  }

  setBackdropClickCanClose(allow: boolean) {
    this.data.disableClose = allow;
    return this;
  }

  setDialogData(newData: D) {
    this.data.data = newData;
    return this;
  }

  open(): MatDialogRef<SdwSimpleDialogComponent, SdwDialogCloseResult<R>> {
    this.setPanelClasses();
    this._config.disableClose = true; // Make sure no one sets this property to false.
    return this._dialogService.open<SdwSimpleDialogComponent, SdwSimpleDialogData<C, D>, SdwDialogCloseResult<R>>(SdwSimpleDialogComponent, this._config);
  }

  setTitle(title: string) {
    this.data.title = title;
    return this;
  }

  showOkButton(text?: string, show = true) {
    this.data.okBtnText = text ? text : undefined;
    this.data.showOkBtn = show;
    return this;
  }

  showAbortButton(text?: string, show = true) {
    this.data.abortBtnText = text ? text : undefined;
    this.data.showAbortBtn = show;
    return this;
  }

  setDisplayComponent(component: ComponentType<C> | TemplateRef<C>) {
    this.data.component = component;
    return this;
  }

  setText(text: string) {
    this.data.text = text;
    return this;
  }
}

@Component({
  selector: 'sdw-simple-dialog',
  templateUrl: './simple-dialog.component.html',
  styleUrls: ['./simple-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'sdw-simple-dialog',
    'tabindex': '-1'
  }
})
export class SdwSimpleDialogComponent extends SdwDialogBase implements OnInit {
  public title: string;
  public text?: string;

  public showAbortBtn: boolean;
  public abortBtnText: string;
  public showOkBtn: boolean;
  public okBtnText: string;

  @ViewChild(CdkPortalOutlet)
  private _outlet: CdkPortalOutlet;

  private _componentRef: ComponentRef<any>;

  private _waitForButtonResult = false;

  constructor(protected dialogRef: MatDialogRef<SdwSimpleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private dlgData: SdwSimpleDialogData,
              private _injector: Injector) {
    super(dialogRef);

    this.title = dlgData.title;
    this.text = dlgData.text;

    this.showAbortBtn = dlgData.showAbortBtn;
    this.abortBtnText = dlgData.abortBtnText;
    this.showOkBtn = dlgData.showOkBtn;
    this.okBtnText = dlgData.okBtnText;
  }

  ngOnInit() {
    this.dialogRef.backdropClick().subscribe(() => {
      if (!this.dlgData.disableClose) {
        this.determineIfCanClose('backdrop');
      }
    });

    if (this.dlgData.component != null) {
      const dialogInjector = new PortalInjector(this._injector, new WeakMap<any, any>([
        [MAT_DIALOG_DATA, this.dlgData.data]
      ]));

      this._componentRef = this.generateComponentInOutlet(
        this.dlgData.component,
        this._outlet,
        dialogInjector,
        this.dlgData.data
      );
    }
  }

  public buttonClicked(isOk: boolean) {
    if (this._waitForButtonResult)
      return;

    this._waitForButtonResult = true;

    this.determineIfCanClose(isOk ? 'confirm' : 'abort');
  }

  /**
   * Checks if the content allows the user to be closed. Calls the onAbort/onOk Methods of the content.
   * @param closedBy How the dialog is beeing closed
   */
  private determineIfCanClose(closedBy: SdwCloseMode) {
    const canClose = closedBy === 'confirm'
      ? dlgOkFn(this._componentRef ? this._componentRef.instance : undefined)
      : dlgAbortFn(this._componentRef ? this._componentRef.instance : undefined);
    determineValue(canClose, (canCloseCallback) => this.closeIfAllowed(canCloseCallback, closedBy));
  }
  /**
   * Closes the dialog if the param is true.
   * Calls close() on the (Material) dialogRef and provides the content components
   * dialog data if any is specified.
   *
   * Resets the 'wait for button' state.
   */
  private closeIfAllowed(canClose: boolean, closedBy: SdwCloseMode) {
    if (canClose) {
      const closeData = dlgGetResult(this._componentRef ? this._componentRef.instance : undefined);
      this.closeDialog({ mode: closedBy, result: closeData } as SdwDialogCloseResult<any>);
    }
    this._waitForButtonResult = false;
  }

}

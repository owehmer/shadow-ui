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
import { GenericDialogBase } from '../generic-dialog-base';
import { determineValue, dlgAbortFn, dlgGetResult, dlgOkFn } from '../generic-dialog-content';

export class SdwSimpleDialogData<C = any, D = any> {
  data: D = null;
  component: ComponentType<C> | TemplateRef<C> | null;
  injector?: Injector;
  showAbortBtn = true;
  abortBtnText = 'Abort';
  showOkBtn = true;
  okBtnText = 'Save';
  title: string | null = '';
  text: string | null;

  constructor(data: Partial<SdwSimpleDialogData> = {}) {
    Object.assign(this, data);
  }
}

export class SdwSimpleDialogBuilder<C = any, D = any, R = any> extends SdwDialogBuilder {
  protected _config: MatDialogConfig<SdwSimpleDialogData>;

  protected get data(): SdwSimpleDialogData<C, D> {
    return this._config.data;
  }

  constructor(dialogService: MatDialog, _config: MatDialogConfig<SdwSimpleDialogData> = null) {
    super(dialogService, _config);
    this._config.data = new SdwSimpleDialogData<C, D>();
  }

  setDialogData(newData: D) {
    this.data.data = newData;
    return this;
  }

  open(): MatDialogRef<SdwSimpleDialogComponent, R> {
    if (this._config.panelClass == null || this._config.panelClass === '')
      this.setPanelClasses();
    return this._dialogService.open<SdwSimpleDialogComponent, SdwSimpleDialogData<C, D>, R>(SdwSimpleDialogComponent, this._config);
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
export class SdwSimpleDialogComponent extends GenericDialogBase implements OnInit {
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
    if (this.dlgData.component != null) {
      const parentInjector = this.dlgData.injector ? this.dlgData.injector : this._injector;
      const dialogInjector = new PortalInjector(parentInjector, new WeakMap<any, any>([
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

    const canClose = isOk
      ? dlgOkFn(this._componentRef ? this._componentRef.instance : undefined)
      : dlgAbortFn(this._componentRef ? this._componentRef.instance : undefined);
    determineValue(canClose, (canCloseCallback) => this.closeIfAllowed(canCloseCallback, isOk));
  }

  /**
   * Closes the dialog if the param is true.
   * Calls close() on the (Material) dialogRef and provides the content components
   * dialog data if any is specified.
   *
   * Resets the 'wait for button' state.
   * @param retVal
   */
  private closeIfAllowed(canClose: boolean, isOkBtn: boolean) {
    if (canClose) {
      const closeData = dlgGetResult(this._componentRef ? this._componentRef.instance : undefined);
      this.closeDialog({ closeOk: isOkBtn, data: closeData });
    }
    this._waitForButtonResult = false;
  }

}

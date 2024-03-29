import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ComponentRef, ElementRef, HostBinding,
  Inject,
  Injector, OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogRef
} from '@angular/material/dialog';
import { CdkPortalOutlet, ComponentType, PortalInjector } from '@angular/cdk/portal';
import { SdwDialogBuilder } from '../dialog-builder';
import { SdwDialogBase } from '../dialog-base';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { determineValue, isNullOrEmpty } from '../helper';
import { dlgAbortFn, dlgGetResult, dlgHasChanges, dlgOkFn } from '../dialog-internal-api';
import { DataThatChanges, SdwCloseMode, SdwDialogCloseResult } from '../dialog-content-api';
import { SdwExtendedOkConfig } from '../blocks/extended-ok/extended-ok.component';

export class SdwAdvancedDialogData<C = any, D = any> {
  data: D = null;
  disableClose = true; // Use own property to control the return value
  component?: ComponentType<C> | TemplateRef<C>;
  text?: string;

  // Top section of dlg
  simpleTitleBar = false; // true => White top bar
  leftIcons: DataThatChanges<string> | null = { changed: 'clear', unchanged: 'keyboard_backspace' };
  rightIcons: DataThatChanges<string> | null = { changed: 'done', unchanged: '' };
  title = '';
  titleColor: 'primary' | 'accent' | 'warn' = 'primary';
  extendedConfig: SdwExtendedOkConfig;

  // Bottom section of dlg
  showAbortBtn = true;
  abortBtnDisabled = false;
  abortBtnText = 'Abort';
  showOkBtn = true;
  okBtnDisabled = false;
  okBtnText = 'Save';

  fullscreenOnMobile = true;
  fullscreenMediaqueries: string[] = [Breakpoints.HandsetPortrait];
  promtOnDiscard = true;
  discardDlgTitle = 'Discard changes?';
  discardDlgText: string | null = null;
  discardDlgOkText = 'Discard';
  discardDlgAbortText = 'Cancel';

  constructor(data: Partial<SdwAdvancedDialogData> = {}) {
    Object.assign(this, data);
  }
}

export class SdwAdvancedDialogBuilder<C = any, D = any, R = any> extends SdwDialogBuilder {
  protected _config: MatDialogConfig<SdwAdvancedDialogData>;

  protected get data(): SdwAdvancedDialogData<C, D> {
    return this._config.data;
  }

  constructor(dialogService: MatDialog, _config: MatDialogConfig<SdwAdvancedDialogData> = null) {
    super(dialogService, _config);
    this._config.disableClose = true;
    this._config.maxWidth = this._config.maxWidth && this._config.maxWidth !== '80vw' ? this._config.maxWidth : '100vw';
    this._config.minHeight = this._config.minHeight ? this._config.minHeight : '135px';
    this._config.data = new SdwAdvancedDialogData<C, D>();
  }

  //region Appearance
  simpleDialogStyle() {
    this.setSimpleTitleBar(true);
    this.setBackdropClickCanClose(true);
    this.setDiscardChangesPromt(false);
    this.setAbortIcon();
    this.setOkIcon();
    this.data.fullscreenOnMobile = false;
    return this;
  }

  setSimpleTitleBar(useSimpleBar = true) {
    this.data.simpleTitleBar = useSimpleBar;
    return this;
  }
  //endregion

  //region Title
  setTitle(title: string) {
    this.data.title = title;
    return this;
  }

  setOkIcon(iconUnchanged?: string, iconChanged?: string) {
    const changed = isNullOrEmpty(iconChanged) ? undefined : iconChanged;
    const unchanged = isNullOrEmpty(iconUnchanged) ? undefined : iconUnchanged;

    this.data.rightIcons = changed || unchanged ? { changed, unchanged } : undefined;
    return this;
  }

  setAbortIcon(iconUnchanged?: string, iconChanged?: string) {
    const changed = isNullOrEmpty(iconChanged) ? undefined : iconChanged;
    const unchanged = isNullOrEmpty(iconUnchanged) ? undefined : iconUnchanged;

    this.data.leftIcons = changed || unchanged ? { changed, unchanged } : undefined;
    return this;
  }
  //endregion

  //region Content
  setDisplay(display: ComponentType<C> | TemplateRef<C>) {
    this.data.component = display;
    return this;
  }

  setDialogData(newData: D) {
    this.data.data = newData;
    return this;
  }

  setText(text: string) {
    this.data.text = text;
    return this;
  }
  //endregion

  //region Footer
  setOkButtonText(text?: string) {
    this.data.okBtnText = text ? text : undefined;
    return this;
  }

  showOkButton(show = true) {
    this.data.showOkBtn = show;
    return this;
  }

  disableOkButton(disable = true) {
    this.data.okBtnDisabled = disable;
    return this;
  }

  setAbortButtonText(text?: string) {
    this.data.abortBtnText = text ? text : undefined;
    return this;
  }

  showAbortButton(show = true) {
    this.data.showAbortBtn = show;
    return this;
  }

  disableAbortButton(disable = true) {
    this.data.abortBtnDisabled = disable;
    return this;
  }
  //endregion

  //region Special features
  setBackdropClickCanClose(allow: boolean) {
    this.data.disableClose = !allow;
    return this;
  }

  setDiscardChangesPromt(promtOnDiscard = true, title?: string, text?: string, okBtn?: string, abortBtn?: string) {
    this.data.promtOnDiscard = promtOnDiscard;
    this.data.discardDlgTitle = title;
    this.data.discardDlgText = text;
    this.data.discardDlgOkText = okBtn;
    this.data.discardDlgAbortText = abortBtn;
  }

  setFullscreenSize(active = true, mediaQueries = [Breakpoints.HandsetPortrait]) {
    this.data.fullscreenOnMobile = active;
    this.data.fullscreenMediaqueries = mediaQueries;

    return this;
  }
  //endregion

  open(): MatDialogRef<SdwAdvancedDialogComponent, R> {
    this.setPanelClasses();
    this._config.disableClose = true; // Make sure no one sets this property to false.
    return this._dialogService.open<SdwAdvancedDialogComponent, SdwAdvancedDialogData<C, D>, R>(SdwAdvancedDialogComponent, this._config);
  }
}

@Component({
  selector: 'sdw-advanced-dialog',
  templateUrl: './advanced-dialog.component.html',
  styleUrls: ['./advanced-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: SdwDialogBase, useClass: SdwAdvancedDialogComponent }],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'sdw-advanced-dialog',
    'tabindex': '-1'
  }
})
export class SdwAdvancedDialogComponent extends SdwDialogBase implements OnInit, AfterViewInit, OnDestroy {
  get fullscreenOnMobile(): boolean {
    return this._fullscreenOnMobile;
  }

  set fullscreenOnMobile(value: boolean) {
    this.setFullscreenOnMobile(null, value);
  }

  get fullscreenMediaqueries(): string[] {
    return this._fullscreenMediaqueries;
  }

  set fullscreenMediaqueries(value: string[]) {
    this.setFullscreenOnMobile(value, null);
  }

  contentChanged = false;

  // Title bar
  simpleTitleBar: boolean;
  leftIcons: DataThatChanges<string>;
  rightIcons: DataThatChanges<string>;
  titleColor: 'primary' | 'accent' | 'warn';
  title: string;
  extendedConfig: SdwExtendedOkConfig;

  // Content
  text?: string;

  // Footer
  showAbortBtn: boolean;
  abortBtnText: string;
  abortBtnDisabled: boolean;

  showOkBtn: boolean;
  okBtnText: string;
  okBtnDisabled: boolean;

  promtOnDiscard: boolean;

  buttonActionHappening = false;

  // Misc
  @HostBinding('class.is-fullscreen')
  isFullsize = false;

  @ViewChild(CdkPortalOutlet, {static: true})
  private _outlet: CdkPortalOutlet;

  private _componentRef: ComponentRef<any>;
  private _changes$$: Subscription;
  private _fullSize$$: Subscription;

  private _fullscreenOnMobile: boolean;
  private _fullscreenMediaqueries: string[];

  constructor(protected dlgService: MatDialog,
              protected dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) protected dlgData: SdwAdvancedDialogData,
              protected _injector: Injector,
              protected _bpObserver: BreakpointObserver,
              protected _elemRef: ElementRef,
              protected cd: ChangeDetectorRef) {
    super(dialogRef);
    if (this.dialogRef._containerInstance._config.disableClose === false)
      console.error('Never set the @angular/material dialog "disableClose" to false with this dialog. It will break this dialogs backdrop close mechanism!');

    // Title bar
    this.simpleTitleBar = dlgData.simpleTitleBar;
    this.leftIcons = dlgData.leftIcons;
    this.rightIcons = dlgData.rightIcons;
    this.title = dlgData.title;
    this.titleColor = dlgData.titleColor;
    this.extendedConfig = dlgData.extendedConfig;

    // Content
    this.text = dlgData.text;

    // Footer
    this.showAbortBtn = dlgData.showAbortBtn;
    this.abortBtnText = dlgData.abortBtnText;
    this.abortBtnDisabled = dlgData.abortBtnDisabled;
    this.showOkBtn = dlgData.showOkBtn;
    this.okBtnText = dlgData.okBtnText;
    this.okBtnDisabled = dlgData.okBtnDisabled;

    // Misc
    this.promtOnDiscard = dlgData.promtOnDiscard;
    this._fullscreenOnMobile = dlgData.fullscreenOnMobile;
    this._fullscreenMediaqueries = dlgData.fullscreenMediaqueries;
  }

  ngOnInit() {
    this.initBackdropClose();
    this.setFullscreenOnMobile();
    this.initDynamicContent();
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this._changes$$)
      this._changes$$.unsubscribe();
    if (this._fullSize$$)
      this._fullSize$$.unsubscribe();
  }

  buttonClicked(isOkBtn: boolean) {
    if (this.buttonActionHappening)
      return;

    this.buttonActionHappening = true;

    if (!isOkBtn && this.promtOnDiscard && this.contentChanged) {
      const builder = new SdwAdvancedDialogBuilder(this.dlgService)
        .setTitle(this.dlgData.discardDlgTitle)
        .setText(this.dlgData.discardDlgText)
        .setAbortButtonText(this.dlgData.discardDlgAbortText)
        .setOkButtonText(this.dlgData.discardDlgOkText)
        .simpleDialogStyle();

      builder.open().afterClosed().subscribe(({ mode }) => {
        if (mode === 'confirm')
          this._determineIfCanClose(mode);
        else {
          this.buttonActionHappening = false;
          this.cd.markForCheck();
        }
      });
    } else {
      this._determineIfCanClose(isOkBtn ? 'confirm' : 'abort');
    }
  }

  /**
   * If no ForceSet is provided it will check the dlgData.fullscreenOnMobile setting
   * @param sizes CSS mediaquery breakpoints
   * @param forceSet
   */
  setFullscreenOnMobile(sizes?: string[], forceSet?: boolean) {
    forceSet = forceSet != null ? forceSet : this.fullscreenOnMobile;
    sizes = sizes != null ? sizes : this.fullscreenMediaqueries;

    this._fullscreenOnMobile = forceSet;
    this._fullscreenMediaqueries = sizes;

    this._updateFullscreenObs(sizes, forceSet);
  }

  protected initBackdropClose() {
    this.dialogRef.backdropClick().subscribe(() => {
      if (!this.dlgData.disableClose) {
        this._determineIfCanClose('backdrop');
      }
    });
  }

  protected initDynamicContent() {
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

      if (this._componentRef && this._componentRef.instance) {
        this._changes$$ = dlgHasChanges(this._componentRef.instance,
          (val) => this.contentChanged = val);
      }
    }
  }

  /**
   * Checks if the content allows the user to be closed. Calls the onAbort/onOk Methods of the content.
   * @param closedBy How the dialog is beeing closed
   */
  protected _determineIfCanClose(closedBy: SdwCloseMode) {
    const canClose = closedBy === 'confirm'
      ? dlgOkFn(this._componentRef ? this._componentRef.instance : undefined)
      : dlgAbortFn(this._componentRef ? this._componentRef.instance : undefined);
    determineValue(canClose, (canCloseCallback) => this._closeIfAllowed(canCloseCallback, closedBy));
  }

  /**
   * Closes the dialog if the param is true.
   * Calls close() on the (Material) dialogRef and provides the content components
   * dialog data if any is specified.
   *
   * Resets the 'wait for button' state.
   */
  protected _closeIfAllowed(canClose: boolean, closedBy: SdwCloseMode) {
    if (canClose) {
      const closeData = dlgGetResult(this._componentRef ? this._componentRef.instance : undefined);
      this.closeDialog({ mode: closedBy, result: closeData } as SdwDialogCloseResult<any>);
    }
    this.buttonActionHappening = false;
  }

  /**
   * Initiates the constant check if mobile is set
   */
  protected _updateFullscreenObs(sizes: string[], set: boolean) {
    if (this._fullSize$$)
      this._fullSize$$.unsubscribe();

    if (!set)
      return;

    this._fullSize$$ = this._bpObserver.observe(sizes).pipe(
      distinctUntilChanged((preResult, nowResult) => preResult.matches === nowResult.matches)
    ).subscribe((result) => {
      const fullscreenClass = 'sdw-fullscreen-dialog';
      const parent = this._elemRef.nativeElement.parentNode;
      const parentParent = parent.parentNode as HTMLElement;

      this.isFullsize = result.matches;

      if (result.matches) {
        // If hight attribute is set take that. Else take the current height
        const originalHeight = parentParent.style.height ? parentParent.style.height : parentParent.clientHeight;
        parentParent.style.height = typeof originalHeight === 'number' ? `${originalHeight}px` : originalHeight;

        // Attach class after a few milliseconds so that the view has time to register the newly set height.
        // Else the animation wont work properly
        setTimeout(() => parentParent.classList.add(fullscreenClass), 10);
      } else {
        // Remove class and wait for animation to end before changing height back to normal
        parentParent.classList.remove(fullscreenClass);
        setTimeout(() => {
          const { height } = this.dialogRef._containerInstance._config;
          parentParent.style.height = height ? height : '';
        }, 250);
      }
      this.cd.detectChanges();
    });
  }
}

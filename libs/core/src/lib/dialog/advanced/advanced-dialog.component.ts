import {
  ChangeDetectionStrategy,
  Component, ComponentRef, ElementRef,
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
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { combineLatest, Subject, Subscription } from 'rxjs';
import { determineValue, isNullOrEmpty } from '../helper';
import { dlgAbortFn, dlgGetResult, dlgHasChanges, dlgOkFn } from '../dialog-internal-api';
import { DataThatChanges, SdwCloseMode, SdwDialogCloseResult } from '../dialog-content-api';

export class SdwAdvancedDialogData<C = any, D = any> {
  data: D = null;
  disableClose = true; // Use own property to control the return value
  component?: ComponentType<C> | TemplateRef<C>;
  text?: string;
  injector?: Injector;

  // Top section of dlg
  simpleTitleBar = false; // true => White top bar
  leftIcons: DataThatChanges<string> | null = { changed: 'clear', unchanged: 'keyboard_backspace' };
  rightIcons: DataThatChanges<string> | null = { changed: 'done', unchanged: '' };
  title = '';
  titleColor: 'primary' | 'accent' | 'warn' = 'primary';

  // Bottom section of dlg
  showAbortBtn = true;
  abortBtnDisabled = false;
  abortBtnText = 'Abort';
  showOkBtn = true;
  okBtnDisabled = false;
  okBtnText = 'Save';

  fullscreenOnMobile = true;
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

  setBackdropClickCanClose(allow: boolean) {
    this.data.disableClose = !allow;
    return this;
  }

  setDialogData(newData: D) {
    this.data.data = newData;
    return this;
  }

  open(): MatDialogRef<SdwAdvancedDialogComponent, R> {
    this.setPanelClasses();
    this._config.disableClose = true; // Make sure no one sets this property to false.
    return this._dialogService.open<SdwAdvancedDialogComponent, SdwAdvancedDialogData<C, D>, R>(SdwAdvancedDialogComponent, this._config);
  }

  setTitle(title: string) {
    this.data.title = title;
    return this;
  }

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

  setOkIcon(iconUnchanged?: string, iconChanged?: string) {
    const changed = isNullOrEmpty(iconChanged) ? undefined : iconChanged;
    const unchanged = isNullOrEmpty(iconUnchanged) ? undefined : iconUnchanged;

    this.data.rightIcons = changed || unchanged ? { changed, unchanged } : undefined;
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

  disablAbortkButton(disable = true) {
    this.data.abortBtnDisabled = disable;
    return this;
  }

  setAbortIcon(iconUnchanged?: string, iconChanged?: string) {
    const changed = isNullOrEmpty(iconChanged) ? undefined : iconChanged;
    const unchanged = isNullOrEmpty(iconUnchanged) ? undefined : iconUnchanged;

    this.data.leftIcons = changed || unchanged ? { changed, unchanged } : undefined;
    return this;
  }

  setDiscardChangesPromt(promtOnDiscard = true, title?: string, text?: string, okBtn?: string, abortBtn?: string) {
    this.data.promtOnDiscard = promtOnDiscard;
    this.data.discardDlgTitle = title;
    this.data.discardDlgText = text;
    this.data.discardDlgOkText = okBtn;
    this.data.discardDlgAbortText = abortBtn;
  }

  setDisplay(display: ComponentType<C> | TemplateRef<C>) {
    this.data.component = display;
    return this;
  }

  setText(text: string) {
    this.data.text = text;
    return this;
  }

  setSimpleTitleBar(useSimpleBar = true) {
    this.data.simpleTitleBar = useSimpleBar;
    return this;
  }

  simpleDialogStyle() {
    this.setSimpleTitleBar(true);
    this.setBackdropClickCanClose(true);
    this.setDiscardChangesPromt(false);
    this.setAbortIcon();
    this.setOkIcon();
    return this;
  }
}

@Component({
  selector: 'sdw-advanced-dialog',
  templateUrl: './advanced-dialog.component.html',
  styleUrls: ['./advanced-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'sdw-advanced-dialog',
    'tabindex': '-1'
  }
})
export class SdwAdvancedDialogComponent extends SdwDialogBase implements OnInit, OnDestroy {
  public contentChanged = false;

  // Title bar
  public simpleTitleBar: boolean;
  public leftIcons: DataThatChanges<string>;
  public rightIcons: DataThatChanges<string>;
  public titleColor: 'primary' | 'accent' | 'warn';
  public title: string;

  // Content
  public text?: string;

  // Footer
  public showAbortBtn: boolean;
  public abortBtnText: string;
  public abortBtnDisabled: boolean;

  public showOkBtn: boolean;
  public okBtnText: string;
  public okBtnDisabled: boolean;

  public get buttonActionHappening() {
    return this._waitForButtonResult;
  }

  public promtOnDiscard: boolean;

  public readonly fullscreenOnMobile$ = new Subject<boolean>();

  @ViewChild(CdkPortalOutlet)
  private _outlet: CdkPortalOutlet;
  private _componentRef: ComponentRef<any>;

  private _changes$$: Subscription;
  private _waitForButtonResult = false;

  private readonly _titleHeight = 64;
  private readonly _footerHeight = 52;

  constructor(protected dlgService: MatDialog,
              protected dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) protected dlgData: SdwAdvancedDialogData,
              protected _injector: Injector,
              protected _bpObserver: BreakpointObserver,
              protected _elemRef: ElementRef) {
    super(dialogRef);
    if (this.dialogRef._containerInstance._config.disableClose === false)
      console.error('Never set the @angular/material dialog "disableClose" to false with this dialog. It will break this dialogs backdrop close mechanism!');

    this.initFullSizeObs();

    // Title bar
    this.simpleTitleBar = dlgData.simpleTitleBar;
    this.leftIcons = dlgData.leftIcons;
    this.rightIcons = dlgData.rightIcons;
    this.title = dlgData.title;
    this.titleColor = dlgData.titleColor;

    // Content
    this.text = dlgData.text;

    // Footer
    this.showAbortBtn = dlgData.showAbortBtn;
    this.abortBtnText = dlgData.abortBtnText;
    this.abortBtnDisabled = dlgData.abortBtnDisabled;
    this.showOkBtn = dlgData.showOkBtn;
    this.okBtnText = dlgData.okBtnText;
    this.okBtnDisabled = dlgData.okBtnDisabled;

    this.promtOnDiscard = dlgData.promtOnDiscard;
  }

  ngOnInit() {
    this.dialogRef.backdropClick().subscribe(() => {
      if (!this.dlgData.disableClose) {
        this.determineIfCanClose('backdrop');
      }
    });

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

      if (this._componentRef && this._componentRef.instance) {
        this._changes$$ = dlgHasChanges(this._componentRef.instance,
          (val) => this.contentChanged = val);
      }
    }

    this.fullscreenOnMobile$.next(this.dlgData.fullscreenOnMobile || true);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this._changes$$)
      this._changes$$.unsubscribe();
  }

  /**
   * Adapt styles set in the config so the content doesn't overflow.
   */
  public getContentStyles() {
    const _config = this.dialogRef._containerInstance._config;
    const heightSubtraction = `${this._titleHeight + this._footerHeight}px`;
    return {
      height: _config.height && _config.height !== '' ? `calc(${_config.height} - ${heightSubtraction})` : undefined,
      'max-height': _config.maxHeight ? `calc(${_config.maxHeight} - ${heightSubtraction})` : undefined,
      'min-height': _config.minHeight ? `calc(${_config.minHeight} - ${heightSubtraction})` : undefined
    };
  }

  public buttonClicked(isOkBtn: boolean) {
    if (this._waitForButtonResult)
      return;

    this._waitForButtonResult = true;

    if (!isOkBtn && this.promtOnDiscard && this.contentChanged) {
      const builder = new SdwAdvancedDialogBuilder(this.dlgService)
        .setTitle(this.dlgData.discardDlgTitle)
        .setText(this.dlgData.discardDlgText)
        .setAbortButtonText(this.dlgData.discardDlgAbortText)
        .setOkButtonText(this.dlgData.discardDlgOkText)
        .simpleDialogStyle();

      builder.open().afterClosed().subscribe(({ mode }) => {
        if (mode === 'confirm')
          this.determineIfCanClose(mode);
        else
          this._waitForButtonResult = false;
      });
    } else {
      this.determineIfCanClose(isOkBtn ? 'confirm' : 'abort');
    }
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

  /**
   * Initiates the constant check if mobile is set
   * TODO: Erst abfragen, wenn man wirklich diese Option anstellt. Wenn aus muss auch wieder unsubscribed werden!
   */
  private initFullSizeObs() {
    combineLatest(
      this._bpObserver.observe([Breakpoints.HandsetPortrait]),
      this.fullscreenOnMobile$
    ).pipe(
      filter(([result, fullscreenOnMobile]) => fullscreenOnMobile),
      distinctUntilChanged(([preResult], [nowResult]) => preResult.matches === nowResult.matches),
      takeUntil(this._destroyed)
    ).subscribe(([result]) => {
      const fullscreenClass = 'sdw-fullscreen-dialog';
      const parent = this._elemRef.nativeElement.parentNode;
      const parentParent = parent.parentNode as HTMLElement;

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
    });
  }
}

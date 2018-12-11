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
import {
  determineValue,
  dlgAbortFn,
  dlgGetResult,
  dlgHasChanges,
  dlgOkFn,
  isNullOrEmpty
} from '../dialog-content-api';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { combineLatest, Subject, Subscription } from 'rxjs';
import { SdwSimpleDialogBuilder } from '../simple/simple-dialog.component';

export class SdwAdvancedDialogData<C = any, D = any> {
  data: D = null;
  component: ComponentType<C> | TemplateRef<C> | null;
  injector?: Injector;

  // Top section of dlg
  showLeftIcon = false;
  leftIcon: DataThatChanges<string> | null = { changed: 'clear', unchanged: 'keyboard_backspace' };
  showRightIcon = false;
  rightIcon: DataThatChanges<string> | null = { changed: 'done', unchanged: '' };
  title = '';
  titleColor: 'primary' | 'accent' | 'warn' = 'primary';

  // Bottom section of dlg
  showAbortBtn = true;
  abortBtnText = 'Abort';
  showOkBtn = true;
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

  setDialogData(newData: D) {
    this.data.data = newData;
    return this;
  }

  open(): MatDialogRef<SdwAdvancedDialogComponent, R> {
    if (this._config.panelClass == null || this._config.panelClass === '')
      this.setPanelClasses();
    return this._dialogService.open<SdwAdvancedDialogComponent, SdwAdvancedDialogData<C, D>, R>(SdwAdvancedDialogComponent, this._config);
  }

  setTitle(title: string) {
    this.data.title = title;
    return this;
  }

  showRightButton(text?: string, show = true) {
    this.data.okBtnText = text ? text : undefined;
    this.data.showOkBtn = show;
    return this;
  }

  showRightIcon(iconUnchanged?: string, iconChanged?: string, show = true) {
    const changed = isNullOrEmpty(iconChanged) ? undefined : iconChanged;
    const unchanged = isNullOrEmpty(iconUnchanged) ? undefined : iconUnchanged;

    this.data.rightIcon = changed || unchanged ? { changed, unchanged } : undefined;
    this.data.showRightIcon = show;
    return this;
  }

  showLeftButton(text?: string, show = true) {
    this.data.abortBtnText = text ? text : undefined;
    this.data.showAbortBtn = show;
    return this;
  }

  showLeftIcon(iconUnchanged?: string, iconChanged?: string, show = true) {
    const changed = isNullOrEmpty(iconChanged) ? undefined : iconChanged;
    const unchanged = isNullOrEmpty(iconUnchanged) ? undefined : iconUnchanged;

    this.data.leftIcon = changed || unchanged ? { changed, unchanged } : undefined;
    this.data.showLeftIcon = show;
    return this;
  }

  setDiscardChangesPromt(promtOnDiscard = true, title?: string, text?: string, okBtn?: string, abortBtn?: string) {
    this.data.promtOnDiscard = promtOnDiscard;
    this.data.discardDlgTitle = title;
    this.data.discardDlgText = text;
    this.data.discardDlgOkText = okBtn;
    this.data.discardDlgAbortText = abortBtn;
  }

  setDisplayComponent(component: ComponentType<C> | TemplateRef<C>) {
    this.data.component = component;
    return this;
  }
}

interface DataThatChanges<T = any> {
  unchanged: T,
  changed: T
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

  public get isTitleCentered() {
    if (this.showLeftIcon === false && this.showRightIcon === false)
      return false;
    const iconsLeft = this.leftIcon ? this.contentChanged ? this.leftIcon.changed : this.leftIcon.unchanged : undefined;
    const iconsRight = this.rightIcon ? this.contentChanged ? this.rightIcon.changed : this.rightIcon.unchanged : undefined;

    return !isNullOrEmpty(iconsLeft) || !isNullOrEmpty(iconsRight);
  }

  public showLeftIcon: boolean;
  public leftIcon: DataThatChanges<string>;
  public showRightIcon: boolean;
  public rightIcon: DataThatChanges<string>;
  public title: string;
  public titleColor: 'primary' | 'accent' | 'warn';

  public showAbortBtn: boolean;
  public abortBtnText: string;
  public showOkBtn: boolean;
  public okBtnText: string;

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

    this.initFullSizeObs();

    this.showLeftIcon = dlgData.showLeftIcon;
    this.leftIcon = dlgData.leftIcon;

    this.showRightIcon = dlgData.showRightIcon;
    this.rightIcon = dlgData.rightIcon;
    this.title = dlgData.title;
    this.titleColor = dlgData.titleColor;

    this.showAbortBtn = dlgData.showAbortBtn;
    this.abortBtnText = dlgData.abortBtnText;
    this.showOkBtn = dlgData.showOkBtn;
    this.okBtnText = dlgData.okBtnText;

    this.promtOnDiscard = dlgData.promtOnDiscard;
  }

  ngOnInit() {
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

    this._changes$$ = dlgHasChanges(this._componentRef.instance,
      (val) => this.contentChanged = val);

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
      const builder = new SdwSimpleDialogBuilder(this.dlgService)
        .setTitle(this.dlgData.discardDlgTitle)
        .setText(this.dlgData.discardDlgText)
        .showAbortButton(this.dlgData.discardDlgAbortText)
        .showOkButton(this.dlgData.discardDlgOkText)
      ;
      builder.open().afterClosed().subscribe(({ closeOk }) => {
        let canClose: any = false;
        if (closeOk) {
          canClose = isOkBtn ? dlgOkFn(this._componentRef.instance) : dlgAbortFn(this._componentRef.instance);
        }
        determineValue(canClose, (canCloseCallback) => this.closeIfAllowed(canCloseCallback, isOkBtn));
      });
    } else {
      const canClose = isOkBtn ? dlgOkFn(this._componentRef.instance) : dlgAbortFn(this._componentRef.instance);
      determineValue(canClose, (canCloseCallback) => this.closeIfAllowed(canCloseCallback, isOkBtn));
    }
  }

  /**
   * Closes the dialog if the param is true.
   * Calls close() on the (Material) dialogRef and provides the content components
   * dialog data if any is specified.
   *
   * Resets the 'wait for button' state.
   * @param canClose
   * @param isOkBtn
   */
  private closeIfAllowed(canClose: boolean, isOkBtn: boolean) {
    if (canClose) {
      const closeData = dlgGetResult(this._componentRef.instance);
      this.closeDialog({ closeOk: isOkBtn, data: closeData });
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

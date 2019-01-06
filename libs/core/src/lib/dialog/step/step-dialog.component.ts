import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ComponentRef,
  ElementRef, HostBinding, HostListener,
  Inject,
  Injector, OnDestroy,
  OnInit, QueryList, TemplateRef, Type, ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import {
  SdwAdvancedDialogBuilder,
  SdwAdvancedDialogComponent,
  SdwAdvancedDialogData
} from '../advanced/advanced-dialog.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CdkPortalOutlet, ComponentType, PortalInjector } from '@angular/cdk/portal';
import { STEPPER_GLOBAL_OPTIONS, StepperSelectionEvent, StepState } from '@angular/cdk/stepper';
import { dlgHasChanges } from '../dialog-internal-api';
import { Subscription } from 'rxjs';
import { DialogWithValidation } from './step-dialog-content-api';

export class SdwStepperDialogData<C = any, D = any> extends SdwAdvancedDialogData<C, D> {
  steps: SdwStep<C>[];
  animateStepChanges?: boolean;
}

export class SdwStepDialogBuilder<C = any, D = any, R = any> extends SdwAdvancedDialogBuilder {
  protected _config: MatDialogConfig<SdwStepperDialogData>;

  protected get data(): SdwStepperDialogData<C, D> {
    return this._config.data;
  }

  open(): MatDialogRef<SdwStepDialogComponent, R> {
    this.setPanelClasses();
    this._config.disableClose = true; // Make sure no one sets this property to false.
    return this._dialogService.open<SdwStepDialogComponent, SdwStepperDialogData<C, D>, R>(SdwStepDialogComponent, this._config);
  }

  setSteps(steps: SdwStep<C>[]) {
    this.data.steps = steps;
    return this;
  }

  animateStepChanges(animate: boolean): SdwStepDialogBuilder {
    this.data.animateStepChanges = animate;
    return this;
  }
}

export interface SdwStep<C = any> {
  title: string,
  subtitle?: string,
  errorSubtitle?: string,
  required?: boolean;
  component: ComponentType<C> | TemplateRef<C>
}

export interface SdwStepInternal<C = any> extends SdwStep<C>{
  componentRef: ComponentRef<any>,
  outlet: CdkPortalOutlet,
  completed: boolean,
  state: StepState
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
  },
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false, showError: true }
    }
  ]
})
export class SdwStepDialogComponent extends SdwAdvancedDialogComponent implements OnInit, AfterViewInit, OnDestroy {
  private static _mapStepToInternalStep(step: SdwStep): SdwStepInternal {
    return {
      ...step,
      componentRef: undefined,
      outlet: undefined,
      completed: false,
      state: 'number'
    };
  }

  stepData: SdwStepInternal[];
  animateStepChanges: boolean;
  stepHeight: number;

  @ViewChildren(CdkPortalOutlet)
  private _outlets: QueryList<CdkPortalOutlet>;

  @ViewChildren('step', { read: ElementRef })
  private _stepElems: QueryList<ElementRef>;

  private _currentSelectedStepIndex = 0;

  private _changesArr$$: Subscription[] = [];

  constructor(protected dlgService: MatDialog,
              protected dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) protected dlgData: SdwStepperDialogData,
              protected _injector: Injector,
              protected _bpObserver: BreakpointObserver,
              protected _elemRef: ElementRef,
              protected cd: ChangeDetectorRef) {
    super(dlgService, dialogRef as MatDialogRef<any>, dlgData, _injector, _bpObserver, _elemRef, cd);

    this.animateStepChanges = dlgData.animateStepChanges != null ? dlgData.animateStepChanges : false;

    this.stepData = this.dlgData.steps.map(SdwStepDialogComponent._mapStepToInternalStep);
  }

  ngOnInit(): void {
    this.initBackdropClose();
    this.initFullscreenOnMobile();
  }

  ngAfterViewInit(): void {
    this.initDynamicContent();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this._changesArr$$.length > 0)
      this._changesArr$$.forEach((c) => !c.closed ? c.unsubscribe() : {});
  }

  stepChanged(event: StepperSelectionEvent): void {
    const stepElems = this._stepElems.toArray();

    if (!this.animateStepChanges || !this._stepElems || this._stepElems.length === 0)
      return;

    this._setStepStateByValidity(this._currentSelectedStepIndex);

    const currentHeight = stepElems[this._currentSelectedStepIndex].nativeElement.clientHeight;

    this._currentSelectedStepIndex = event.selectedIndex;
    this._setStepStateByValidity(this._currentSelectedStepIndex, 'number');

    const newHeight = stepElems[this._currentSelectedStepIndex].nativeElement.clientHeight;
    const stepHeaderSize = 112;

    // TODO: Nicer ways?
    setTimeout(() => {
      this.stepHeight = currentHeight + stepHeaderSize;
      this.cd.detectChanges();
    }, 10);

    setTimeout(() => {
      this.stepHeight = newHeight + stepHeaderSize;
      this.cd.detectChanges();
    }, 210);

    setTimeout(() => {
      this.stepHeight = undefined;
      this.cd.detectChanges();
    }, 300);
  }

  addStep(step: SdwStep) {
    this.insertStep(this.stepData.length, step);
  }

  insertStep(index: number, step: SdwStep) {
    this.stepData.splice(index, 0, SdwStepDialogComponent._mapStepToInternalStep(step));
    this.cd.detectChanges();
    this.initDynamicContent();
  }

  /**
   *
   * @param instance Instance or index
   * @param subtitle
   */
  changeStepSubtitle(instanceOrIndex: any | number, subtitle: string) {
    const step = typeof instanceOrIndex === 'number'
      ? this.getStepAtIndex(instanceOrIndex)
      : this.getStepAtIndex(this._getStepIndexByInstance(instanceOrIndex));
    step.subtitle = subtitle;
  }

  /**
   *
   * @param instance Instance or index
   * @param subtitle
   */
  changeStepErrorSubtitle(instanceOrIndex: any | number, subtitle: string) {
    const step = typeof instanceOrIndex === 'number'
      ? this.getStepAtIndex(instanceOrIndex)
      : this.getStepAtIndex(this._getStepIndexByInstance(instanceOrIndex));
    step.errorSubtitle = subtitle;
  }

  getNextStep<C = any>(instance: any): SdwStep<C> {
    const index = this._getStepIndexByInstance(instance);
    return index >= 0 && index < this.stepData.length ? this.getStepAtIndex(index + 1) : null;
  }

  getPreviousStep<C = any>(instance: any): SdwStep<C> {
    const index = this._getStepIndexByInstance(instance);
    return index > 0 ? this.getStepAtIndex(index - 1) : null;
  }

  getStepAtIndex<C = any>(index: number): SdwStep<C> {
    return index != null && index >= 0 ? this.stepData[index] : null;
  }

  protected initDynamicContent() {
    if (this.dlgData.steps != null && this.dlgData.steps.length > 0) {
      const dialogInjector = new PortalInjector(this._injector, new WeakMap<any, any>([
        [MAT_DIALOG_DATA, this.dlgData.data]
      ]));

      // const outlets = this._outlets.toArray();

      this.stepData.forEach((s) => {
        if (s.outlet === undefined) {
          s.outlet = this._getNextFreeOutlet();
          s.componentRef = this.generateComponentInOutlet( // TODO: Add simple text
            s.component,
            s.outlet,
            dialogInjector,
            this.dlgData.data
          );
          if (s.componentRef) {
            this._changesArr$$.push(
              dlgHasChanges(s.componentRef.instance, (val) => this.contentChanged = val)
            );
          }
        }
      });
    }
  }

  private _getNextFreeOutlet(): CdkPortalOutlet {
    return this._outlets.find((o) => !o.hasAttached());
  }

  private _getStepIndexByInstance(instance: any): number {
    return this.stepData.findIndex(d => d.componentRef.instance === instance);
  }

  private _isStepValid(index: number): boolean {
    const step = this.stepData[index];
    const component = step.componentRef.instance as DialogWithValidation;

    return component == null || component.isValid == null
      ? true
      : component.isValid();
  }

  private _setStepStateByValidity(index: number, forceState?: StepState) {
    if (this.stepData != null && index >= 0 && index < this.stepData.length) {
      this.stepData[index].state = forceState
        ? forceState
        : this._isStepValid(index) ? 'done' : 'error';
    }
  }
}

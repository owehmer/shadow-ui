import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ComponentRef, EmbeddedViewRef, Inject, InjectionToken, Injector,
  Input, OnChanges,
  OnInit, Optional, SimpleChanges,
  TemplateRef, ViewChild,
} from '@angular/core';
import {ComponentType} from '@angular/cdk/overlay';
import {BehaviorSubject} from 'rxjs';
import {CdkPortalOutlet, ComponentPortal, PortalInjector, TemplatePortal} from '@angular/cdk/portal';
import {SdwFormMaterialElementComponent} from './form-mat-element.component';
import {SdwFormComponent} from '../form.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from '@angular/material/form-field';

export const FORM_DYNAMIC_ELEMENT_DATA = new InjectionToken<any>('sdwFormDynamicElementData');

@Component({
  selector: 'sdw-form-dynamic-element',
  template: `
      <ng-template cdkPortalOutlet></ng-template>

      <ng-content></ng-content>
  `,
  styles: [':host { display: block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'sdw-dynamic'
  }
})
export class SdwFormDynamicElementComponent extends SdwFormMaterialElementComponent implements OnInit, AfterViewInit, OnChanges {
  // Dynamic form component
  @Input() componentOrTemplate: ComponentType<any> | TemplateRef<any>;

  // Dynamic form component data
  @Input()
  set componentOrTemplateData(value: any) {
    this._componentOrTemplateData = value;
    this._componentDataChanged$.next(value);
  }

  get componentOrTemplateData(): any {
    return this._componentOrTemplateData;
  }

  protected _componentDataChanged$ = new BehaviorSubject<any>(null);
  protected _componentOrTemplateData: any;
  protected _contentInstance: ComponentRef<any> | EmbeddedViewRef<any>;

  @ViewChild(CdkPortalOutlet, {static: true})
  private _outlet: CdkPortalOutlet;

  constructor(form: SdwFormComponent,
              cd: ChangeDetectorRef,
              @Optional() @Inject(MAT_FORM_FIELD_DEFAULT_OPTIONS) _formFieldOptions: MatFormFieldDefaultOptions,
              private _injector: Injector) {
    super(form, cd, _formFieldOptions);
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this._generateComponentInOutlet(this.componentOrTemplate, this._componentOrTemplateData);
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    const compOrTemplate = changes['componentOrTemplate'];

    if (compOrTemplate != null && !compOrTemplate.isFirstChange()) {
      this._generateComponentInOutlet(this.componentOrTemplate, this._componentOrTemplateData);
    }
  }

  private _generateComponentInOutlet(compOrTemp: ComponentType<any> | TemplateRef<any>, data?: any): void {
    const componentOrTemplateRef = compOrTemp;
    let instance: ComponentRef<any> | EmbeddedViewRef<any>;

    if (this._outlet && this._outlet.hasAttached()) {
      this._outlet.dispose();
    }

    if (this._outlet == null || componentOrTemplateRef == null) {
      this._contentInstance = null;
      return;
    }

    if (componentOrTemplateRef instanceof TemplateRef) {
      instance = this._outlet.attachTemplatePortal(
        new TemplatePortal<any>(componentOrTemplateRef, null,
          {$implicit: data}));
    } else {
      const dialogInjector = new PortalInjector(this._injector, new WeakMap<any, any>([
        [FORM_DYNAMIC_ELEMENT_DATA, data]
      ]));

      instance = this._outlet.attachComponentPortal<any>(
        new ComponentPortal(componentOrTemplateRef, undefined, dialogInjector));
    }
    this._contentInstance = instance;
    this._cd.detectChanges();
  }
}

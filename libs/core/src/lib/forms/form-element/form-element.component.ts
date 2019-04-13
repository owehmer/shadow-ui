import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ComponentRef, EmbeddedViewRef, InjectionToken, Injector,
  Input,
  OnChanges, OnInit,
  SimpleChanges, TemplateRef, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { SdwFormComponent } from '../form/form.component';
import { AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn } from '@angular/forms';
import { CdkPortalOutlet, ComponentPortal, ComponentType, PortalInjector, TemplatePortal } from '@angular/cdk/portal';
import { BehaviorSubject, Observable } from 'rxjs';
import { skip } from 'rxjs/operators';

export const FORM_ELEMENT_DATA = new InjectionToken<any>('sdwFormElementData');

@Component({
  selector: 'sdw-form-element',
  templateUrl: './form-element.component.html',
  styleUrls: ['./form-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'sdw-form-element'
  }
})
export class SdwFormElementComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() name: string;
  @Input() value: any;

  @Input() validatorOrOpts: ValidatorFn | ValidatorFn[] | AbstractControlOptions;
  @Input() asyncValidator: AsyncValidatorFn | AsyncValidatorFn[];
  @Input() componentOrTemplate: ComponentType<any> | TemplateRef<any>;

  @Input()
  set componentOrTemplateData(value: any) {
    this._componentOrTemplateData = value;
    this._componentDataChanged$.next(value);
  }

  // TODO: Add to 'validatorOrOpts'
  // @Input()
  // set required(val: boolean) {
  //
  // }

  get componentOrTemplateData(): any {
    return this._componentOrTemplateData;
  }

  // TODO: skip everything pre init?
  get componentDataChanged$(): Observable<any> {
    return this._componentDataChanged$.pipe();
  }

  formControl: FormControl;

  private _componentDataChanged$ = new BehaviorSubject<any>(null);

  private _componentOrTemplateData: any;

  @ViewChild(CdkPortalOutlet)
  private _outlet: CdkPortalOutlet;

  private _contentInstance: ComponentRef<any> | EmbeddedViewRef<any>;

  constructor(private _form: SdwFormComponent,
              private _injector: Injector,
              private _cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.formControl = new FormControl(this.value, this.validatorOrOpts, this.asyncValidator);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const name = changes['name'];
    const value = changes['value'];
    const validatorOrOpts = changes['validatorOrOpts'];
    const asyncValidator = changes['asyncValidator'];
    const compOrTemplate = changes['componentOrTemplate'];
    const componentOrTemplateData = changes['componentOrTemplateData'];

    if (name != null && !name.isFirstChange()) {
      this._form.formGroup.removeControl(name.previousValue);
      this._form.formGroup.addControl(name.currentValue, this.formControl);
    }
    if (value != null && !value.isFirstChange()) {
      // this.formControl.setValue(value);
    }
    if (validatorOrOpts != null && !validatorOrOpts.isFirstChange()) {
    }
    if (asyncValidator != null && !asyncValidator.isFirstChange()) {
    }
    if (compOrTemplate != null && !compOrTemplate.isFirstChange()) {
    }
    if (componentOrTemplateData != null && !componentOrTemplateData.isFirstChange()) {
    }
  }

  ngAfterViewInit(): void {
    if (this.name == null)
      throw new Error('You need to pass in a name into a SdwFormElementComponent to init this component!');

    // if (this.formControl == null)
    //   throw new Error(`Can't create an instance of SdwFormElementComponent. The content has no FormControl!`);

    this._generateComponentInOutlet(this.componentOrTemplate, this._componentOrTemplateData);

    this._form.formGroup.addControl(this.name, this.formControl);
  }

  private _generateComponentInOutlet(compOrTemp: ComponentType<any> | TemplateRef<any>, data?: any) {
    const componentOrTemplateRef = compOrTemp;
    let instance: ComponentRef<any> | EmbeddedViewRef<any>;

    if (componentOrTemplateRef instanceof TemplateRef) {
      instance = this._outlet.attachTemplatePortal(
        new TemplatePortal<any>(componentOrTemplateRef, null,
          { $implicit: data }));
    } else {
      const dialogInjector = new PortalInjector(this._injector, new WeakMap<any, any>([
        [FORM_ELEMENT_DATA, data]
      ]));

      instance = this._outlet.attachComponentPortal<any>(
        new ComponentPortal(componentOrTemplateRef, undefined, dialogInjector));
    }
    this._contentInstance = instance;
    this._cd.detectChanges();
  }

}

import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ComponentRef, EmbeddedViewRef, InjectionToken, Injector,
  Input,
  OnChanges,
  SimpleChanges, TemplateRef, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { SdwFormComponent } from '../form/form.component';
import { FormControl } from '@angular/forms';
import { CdkPortalOutlet, ComponentPortal, ComponentType, PortalInjector, TemplatePortal } from '@angular/cdk/portal';
import { ValidateFn } from 'codelyzer/walkerFactory/walkerFn';
import { Subject } from 'rxjs';

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
export class SdwFormElementComponent implements AfterViewInit, OnChanges {
  @Input()
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  @Input()
  get validators(): ValidateFn<any>[] {
    return this._validators;
  }

  set validators(value: ValidateFn<any>[]) {
    this._validators = value;
  }

  @Input()
  get componentOrTemplate(): ComponentType<any> | TemplateRef<any> {
    return this._componentOrTemplate;
  }

  set componentOrTemplate(value: ComponentType<any> | TemplateRef<any>) {
    this._componentOrTemplate = value;
  }

  @Input()
  get componentOrTemplateData(): any {
    return this._componentOrTemplateData;
  }

  set componentOrTemplateData(value: any) {
    this._componentOrTemplateData = value;
    this.inputChanged$.next(value);
  }

  inputChanged$ = new Subject();

  formControl: FormControl;

  private _name: string;
  private _validators: ValidateFn<any>[];
  private _componentOrTemplate: ComponentType<any> | TemplateRef<any>;
  private _componentOrTemplateData: any;

  @ViewChild(CdkPortalOutlet)
  private _outlet: CdkPortalOutlet;

  private _contentInstance: ComponentRef<any> | EmbeddedViewRef<any>;

  constructor(private _form: SdwFormComponent,
              private _injector: Injector,
              private _cd: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const name = changes['name'];
    const validators = changes['validators'];
    const compOrTemplate = changes['componentOrTemplate'];
    const componentOrTemplateData = changes['componentOrTemplateData'];

    if (name != null && !name.isFirstChange()) {
      this._form.formGroup.removeControl(name.previousValue);
      this._form.formGroup.addControl(name.currentValue, this.formControl);
    }
    if (validators != null && !validators.isFirstChange()) {

    }
    if (compOrTemplate != null && !compOrTemplate.isFirstChange()) {

    }
    if (componentOrTemplateData != null && !componentOrTemplateData.isFirstChange()) {

    }
  }

  ngAfterViewInit(): void {
    // if (this.name == null)
    //   throw new Error('You need to pass in a name into a SdwFormElementComponent to init this component!');
    //
    // if (this.formControl == null)
    //   throw new Error(`Can't create an instance of SdwFormElementComponent. The content has no FormControl!`);

    this._generateComponentInOutlet(this._componentOrTemplate, this._componentOrTemplateData);

    // this._form.formGroup.addControl(this.name, this.formControl);
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

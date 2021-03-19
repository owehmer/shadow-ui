import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, Directive, Inject,
  Input,
  OnChanges, OnDestroy, OnInit, Optional, TemplateRef, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { SdwFormComponent } from './form.component';
import { hasFormControlRequiredValidator } from './helpers';
import {
  FloatLabelType,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldAppearance,
  MatFormFieldDefaultOptions
} from '@angular/material/form-field';
import { ThemePalette } from '@angular/material/core';
import { SdwFormElementComponent } from './form-element.component';

@Directive({
  selector: '[sdwFormSuffix]'
})
export class SdwFormSuffixTemplateDirective {
  constructor(public templateRef: TemplateRef<any>) {
  }
}

@Component({
  selector: 'sdw-form-mat-element',
  template: `
    <ng-content></ng-content>`,
  styles: [':host { display: block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'sdw-form-mat-element'
  }
})
export class SdwFormMaterialElementComponent extends SdwFormElementComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  // Form Field Options
  @Input() appearance: MatFormFieldAppearance;
  @Input() color: ThemePalette;
  @Input() floatLabel: FloatLabelType;
  @Input() hideRequiredMarker: boolean;
  @Input() hintLabel: string;
  @Input() label: string;
  @Input() placeholder: string;

  @Input() shownErrors: string[];

  get errors(): any[] {
    if (!this.shownErrors) {
      return null;
    }
    const ctrlErrors = this.formControl && this.formControl.errors ? this.formControl.errors : {};
    const visibleErrorsKeys = Object.keys(ctrlErrors).filter(e => this.shownErrors.includes(e));
    return visibleErrorsKeys.map(key => ctrlErrors[key]);
  }

  get firstError(): any {
    return this.errors && this.errors.length > 0 ? this.errors[0] : undefined;
  }

  @ViewChild(SdwFormSuffixTemplateDirective, { static: true })
  readonly suffixTemplate: SdwFormSuffixTemplateDirective;

  get showRequiredMarker(): boolean {
    return !this.hideRequiredMarker && hasFormControlRequiredValidator(this.formControl);
  }

  constructor(_form: SdwFormComponent,
              _cd: ChangeDetectorRef,
              @Optional() @Inject(MAT_FORM_FIELD_DEFAULT_OPTIONS) protected _formFieldOptions: MatFormFieldDefaultOptions) {
    super(_form, _cd);
    if (_formFieldOptions) {
      this.appearance = _formFieldOptions.appearance;
      this.hideRequiredMarker = _formFieldOptions.hideRequiredMarker;
    }
  }
}

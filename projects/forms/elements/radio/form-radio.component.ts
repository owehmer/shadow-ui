import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ContentChild, Directive, Inject, Input, Optional, TemplateRef,
  ViewChild
} from '@angular/core';
import {SdwFormMaterialElementComponent, SdwFormComponent} from '@shadowui/forms/core';
import {MatRadioGroup} from '@angular/material/radio';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from '@angular/material/form-field';

export interface SdwFormRadioOption {
  label: string;
  value: string | number;
}

@Directive({
  selector: '[sdwFormRadioTemplate]'
})
export class SdwFormRadioTemplateDirective {

  constructor(public templateRef: TemplateRef<any>) {
  }
}

@Component({
  selector: 'sdw-form-radio, [sdw-form-radio]',
  templateUrl: './form-radio.component.html',
  styleUrls: ['./form-radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'sdw-form-elements sdw-form-radio',
  }
})

export class SdwFormRadioComponent extends SdwFormMaterialElementComponent {
  @Input() labelPosition: 'before' | 'after';
  @Input() disableRipple: boolean;

  @Input() options: SdwFormRadioOption[];

  @ViewChild(MatRadioGroup, {static: true}) readonly matRadioGroup: MatRadioGroup;

  @ContentChild(SdwFormRadioTemplateDirective, {static: true}) templateDir: SdwFormRadioTemplateDirective;

  constructor(form: SdwFormComponent,
              cd: ChangeDetectorRef,
              @Optional() @Inject(MAT_FORM_FIELD_DEFAULT_OPTIONS) _formFieldOptions: MatFormFieldDefaultOptions) {
    super(form, cd, _formFieldOptions);
  }
}

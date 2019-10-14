import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ContentChild, Directive, Input, TemplateRef,
  ViewChild
} from '@angular/core';
import { SdwFormElementComponent } from '../form-element.component';
import { SdwFormComponent } from '../../form/form.component';
import { MatRadioGroup } from '@angular/material/radio';
import { ThemePalette } from '@angular/material/core';

export interface SdwFormRadioOption {
  label: string;
  value: string | number;
}

@Directive({
  selector: '[sdwFormRadioTemplate]'
})
export class SdwFormRadioTemplateDirective {

  constructor(public templateRef: TemplateRef<any>) { }
}

@Component({
  selector: 'sdw-form-radio, [sdw-form-radio]',
  templateUrl: './form-radio.component.html',
  styleUrls: ['./form-radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'sdw-form-element sdw-form-radio',
  }
})

export class SdwFormRadioComponent extends SdwFormElementComponent {
  @Input() color: ThemePalette;
  @Input() labelPosition: 'before' | 'after';
  @Input() disableRipple: boolean;

  @Input() options: SdwFormRadioOption[];

  @ViewChild(MatRadioGroup, {static: true}) readonly matRadioGroup: MatRadioGroup;

  @ContentChild(SdwFormRadioTemplateDirective, {static: true}) templateDir: SdwFormRadioTemplateDirective;

  constructor(form: SdwFormComponent,
              cd: ChangeDetectorRef) {
    super(form, cd);
  }
}

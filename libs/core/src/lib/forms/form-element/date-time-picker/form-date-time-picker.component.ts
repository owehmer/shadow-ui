import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, Directive, Input, TemplateRef, ViewChild
} from '@angular/core';
import { SdwFormElementComponent } from '../form-element.component';
import { SdwFormComponent } from '../../form/form.component';
import { MatDatepicker } from '@angular/material/datepicker';

@Directive({
  selector: '[sdwFormSDateTimeSuffixTemplate]'
})
export class SdwFormDateTimeSuffixTemplateDirective {

  constructor(public templateRef: TemplateRef<any>) { }
}

@Component({
  selector: 'sdw-form-date-time-picker, [sdw-form-date-time-picker]',
  templateUrl: './form-date-time-picker.component.html',
  styleUrls: ['./form-date-time-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'sdw-form-element sdw-form-date-time-picker',
  }
})

export class SdwFormDateTimePickerComponent<D> extends SdwFormElementComponent {
  @Input() showDate = true;
  @Input() showTime = true;

  @Input() placeholder: string;

  @Input() highlightBgColor: string;

  @Input() hint: string;

  // @ViewChild(MatDatepicker, {static: true}) readonly matSelect: MatDatepicker<D>;
  @ViewChild(SdwFormDateTimeSuffixTemplateDirective, {static: true})
  suffixTemplate: SdwFormDateTimeSuffixTemplateDirective;

  constructor(form: SdwFormComponent,
              cd: ChangeDetectorRef) {
    super(form, cd);
  }
}

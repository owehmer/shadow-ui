import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ContentChild, Directive, Inject, Input, Optional, TemplateRef, ViewChild
} from '@angular/core';
import {SdwFormMaterialElementComponent, SdwFormComponent} from '@shadowui/forms/core';
import {MatCalendarCellCssClasses, MatDatepicker} from '@angular/material/datepicker';
import {ComponentType} from '@angular/cdk/overlay';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from '@angular/material/form-field';

@Directive({
  selector: '[sdwFormDatepicketButtonTemplate]'
})
export class SdwFormDatepicketButtonTemplateDirective {

  constructor(public templateRef: TemplateRef<any>) {
  }
}

@Component({
  selector: 'sdw-form-datepicker, [sdw-form-datepicker]',
  templateUrl: './form-datepicker.component.html',
  styleUrls: ['./form-datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'sdw-form-elements sdw-form-datepicker',
  }
})

export class SdwFormDatepickerComponent<D> extends SdwFormMaterialElementComponent {
  @Input() calendarHeaderComponent: ComponentType<any>;
  @Input() dateClass: (date: D) => MatCalendarCellCssClasses;
  @Input() panelClass: string | string[];
  @Input() touchUi: boolean;

  @Input() matDatepickerFilter: (date: D) => boolean;
  @Input() max: D | null;
  @Input() min: D | null;

  @Input() showToggleButton = true;
  @Input() toggleOnFocus = false;

  @ViewChild(MatDatepicker, {static: true}) readonly matSelect: MatDatepicker<D>;

  @ContentChild(SdwFormDatepicketButtonTemplateDirective, {static: true})
  toggleButtonTemplate: SdwFormDatepicketButtonTemplateDirective;

  constructor(form: SdwFormComponent,
              cd: ChangeDetectorRef,
              @Optional() @Inject(MAT_FORM_FIELD_DEFAULT_OPTIONS) _formFieldOptions: MatFormFieldDefaultOptions) {
    super(form, cd, _formFieldOptions);
  }

  openPickerIfSet() {
    if (this.toggleOnFocus) {
      this.matSelect.open();
    }
  }
}

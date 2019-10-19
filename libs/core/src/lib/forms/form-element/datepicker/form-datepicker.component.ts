import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ContentChild, Directive, Input, TemplateRef, ViewChild
} from '@angular/core';
import { SdwFormElementComponent } from '../form-element.component';
import { SdwFormComponent } from '../../form/form.component';
import { MatCalendarCellCssClasses, MatDatepicker } from '@angular/material/datepicker';
import { ComponentType } from '@angular/cdk/overlay';
import { ThemePalette } from '@angular/material/core';


@Directive({
  selector: '[sdwFormDatepicketButtonTemplate]'
})
export class SdwFormDatepicketButtonTemplateDirective {

  constructor(public templateRef: TemplateRef<any>) { }
}

@Component({
  selector: 'sdw-form-datepicker, [sdw-form-datepicker]',
  templateUrl: './form-datepicker.component.html',
  styleUrls: ['./form-datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'sdw-form-element sdw-form-datepicker',
  }
})

export class SdwFormDatepickerComponent<D> extends SdwFormElementComponent {
  @Input() calendarHeaderComponent: ComponentType<any>;
  @Input() color: ThemePalette;
  @Input() dateClass: (date: D) => MatCalendarCellCssClasses;
  @Input() panelClass: string | string[];
  @Input() touchUi: boolean;

  @Input() placeholder: string;

  @Input() matDatepickerFilter: (date: D) => boolean;
  @Input() max: D | null;
  @Input() min: D | null;

  @Input() showToggleButton = true;
  @Input() toggleOnFocus = false;

  @ViewChild(MatDatepicker, {static: true}) readonly matSelect: MatDatepicker<D>;

  @ContentChild(SdwFormDatepicketButtonTemplateDirective, {static: true})
  toggleButtonTemplate: SdwFormDatepicketButtonTemplateDirective;

  constructor(form: SdwFormComponent,
              cd: ChangeDetectorRef) {
    super(form, cd);
  }

  openPickerIfSet() {
    if (this.toggleOnFocus) {
      this.matSelect.open();
    }
  }
}

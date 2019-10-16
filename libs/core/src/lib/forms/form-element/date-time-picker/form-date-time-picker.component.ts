import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ContentChild, Directive, Input, TemplateRef, ViewChild
} from '@angular/core';
import { SdwFormElementComponent } from '../form-element.component';
import { SdwFormComponent } from '../../form/form.component';
import { MatCalendarCellCssClasses, MatDatepicker } from '@angular/material/datepicker';
import { ComponentType } from '@angular/cdk/overlay';
import { ThemePalette } from '@angular/material/core';

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
  @Input() calendarHeaderComponent: ComponentType<any>;
  @Input() color: ThemePalette;
  @Input() dateClass: (date: D) => MatCalendarCellCssClasses;
  @Input() panelClass: string | string[];
  @Input() touchUi: boolean;

  @Input() matDatepickerFilter: (date: D) => boolean;
  @Input() max: D | null;
  @Input() min: D | null;

  @Input() showToggleButton = true;
  @Input() toggleOnFocus = false;

  @ViewChild(MatDatepicker, {static: true}) readonly matSelect: MatDatepicker<D>;

  constructor(form: SdwFormComponent,
              cd: ChangeDetectorRef) {
    super(form, cd);
  }
}

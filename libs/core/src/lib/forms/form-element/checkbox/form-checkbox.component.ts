import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, Inject,
  Input, Optional, ViewChild
} from '@angular/core';
import { SdwFormMaterialElementComponent } from '../form-mat-element.component';
import { SdwFormComponent } from '../../form/form.component';
import { ThemePalette } from '@angular/material/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';

@Component({
  selector: 'sdw-form-checkbox, [sdw-form-checkbox]',
  templateUrl: './form-checkbox.component.html',
  styleUrls: ['./form-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'sdw-form-element sdw-form-checkbox',
  }
})
export class SdwFormCheckboxComponent extends SdwFormMaterialElementComponent {
  @Input('aria-label') ariaLabel: string;
  @Input('aria-labelledby') ariaLabelledby: string | null;
  @Input() disableRipple: boolean;
  @Input() labelPosition: 'before' | 'after';

  @ViewChild(MatCheckbox, {static: true}) readonly matCheckbox: MatCheckbox;

  constructor(form: SdwFormComponent,
              cd: ChangeDetectorRef,
              @Optional() @Inject(MAT_FORM_FIELD_DEFAULT_OPTIONS) _formFieldOptions: MatFormFieldDefaultOptions) {
    super(form, cd, _formFieldOptions);
  }
}

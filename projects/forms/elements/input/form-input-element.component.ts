import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, Inject,
  Input, Optional, ViewChild
} from '@angular/core';
import {MatInput} from '@angular/material/input';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from '@angular/material/form-field';
import { SdwFormMaterialElementComponent } from '../../core/form-mat-element.component';
import { SdwFormElementTypes } from '../../core/models';
import { SdwFormComponent } from '../../core/form.component';

@Component({
  selector: 'sdw-form-input-element, [sdw-form-input-element]',
  templateUrl: './form-input-element.component.html',
  styleUrls: ['./form-input-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'sdw-form-elements sdw-input',
  }
})

export class SdwFormInputElementComponent extends SdwFormMaterialElementComponent {
  @Input() type: SdwFormElementTypes = 'text';

  @Input() autocomplete = false;
  @Input() spellcheck = false;
  @Input() max: number;
  @Input() min: number;
  @Input() minLength: number;
  @Input() maxLength: number;
  @Input() pattern: string;

  @ViewChild(MatInput, {static: true}) readonly matInput: MatInput;

  constructor(form: SdwFormComponent,
              cd: ChangeDetectorRef,
              @Optional() @Inject(MAT_FORM_FIELD_DEFAULT_OPTIONS) _formFieldOptions: MatFormFieldDefaultOptions) {
    super(form, cd, _formFieldOptions);
  }
}

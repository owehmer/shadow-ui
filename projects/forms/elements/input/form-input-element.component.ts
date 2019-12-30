import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, Inject,
  Input, Optional, ViewChild
} from '@angular/core';
import {SdwFormMaterialElementComponent, SdwFormComponent, SdwFormElementTypes} from '@shadowui/forms/core';
import {MatInput} from '@angular/material/input';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from '@angular/material/form-field';

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

  @ViewChild(MatInput, {static: true}) readonly matInput: MatInput;

  constructor(form: SdwFormComponent,
              cd: ChangeDetectorRef,
              @Optional() @Inject(MAT_FORM_FIELD_DEFAULT_OPTIONS) _formFieldOptions: MatFormFieldDefaultOptions) {
    super(form, cd, _formFieldOptions);
  }
}

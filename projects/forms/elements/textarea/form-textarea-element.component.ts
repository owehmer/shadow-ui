import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, Inject,
  Input, Optional, ViewChild
} from '@angular/core';
import {SdwFormMaterialElementComponent, SdwFormComponent, SdwFormElementTypes} from '@shadowui/forms/core';
import {MatInput} from '@angular/material/input';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from '@angular/material/form-field';

@Component({
  selector: 'sdw-form-textarea-element, [sdw-form-textarea-element]',
  templateUrl: './form-textarea-element.component.html',
  styleUrls: ['./form-textarea-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'sdw-form-elements sdw-textarea',
  }
})

export class SdwFormTextareaElementComponent extends SdwFormMaterialElementComponent {
  @Input() type: SdwFormElementTypes = 'text';

  @Input() autosize = false;

  @Input()
  maxRows: number;

  @Input()
  minRows: number;

  @ViewChild(MatInput, {static: true}) readonly matInput: MatInput;

  constructor(form: SdwFormComponent,
              cd: ChangeDetectorRef,
              @Optional() @Inject(MAT_FORM_FIELD_DEFAULT_OPTIONS) _formFieldOptions: MatFormFieldDefaultOptions) {
    super(form, cd, _formFieldOptions);
  }
}

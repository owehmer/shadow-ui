import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {
  AsyncValidatorFn,
  FormBuilder,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {SdwFormComponent, SdwFormRadioOption, SdwFormSelectGroup, TransformToSimpleOptions} from '@shadowui/forms';
let id = 1;

function WID() {
  return String(id++);
}

@Component({
  selector: 'shadow-ui-form-demo',
  templateUrl: './form-demo.component.html',
  styleUrls: ['./form-demo.component.css'],
  providers: [
  ]
})
export class FormDemoComponent implements OnInit {
  name = 'test1';
  placeholder = 'place';
  label = null;

  selectOptions: SdwFormSelectGroup[] = [
    TransformToSimpleOptions([
      { label: 'Option 1', value: 123, disabled: false },
      { label: 'Option 2', value: '456', disabled: false },
      { label: 'Option 3', value: '456', disabled: true }
    ]),
    {
      label: 'SOME GROUP',
      disabled: false,
      options: [
        { label: 'Option 4', value: 'hggf'}
      ]
    }
  ];

  radioOptions: SdwFormRadioOption[] = [
    { label: 'Option 1', value: 123 },
    { label: 'Foo', value: 'bar' }
  ];

  formGroup = this._fb.group({ test1: 'asd' });

  requiredValidator = Validators.required;
  minLengthValidator = Validators.minLength(4);
  customAsyncValidator: AsyncValidatorFn = (control => {
    const innerValidation: ValidationErrors = {
      hier: true
    };
    return Promise.resolve(innerValidation);
  });

  formResult;

  @ViewChild(SdwFormComponent, { static: true })
  private _formComponent: SdwFormComponent;

  constructor(private _fb: FormBuilder,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this._formComponent.valueChanges$.subscribe(data => {
      console.warn('DEMO', data);
      this.formResult = data;
      // this.cd.detectChanges();
    });
  }

  editPlaceholder() {
    this.placeholder = WID();
  }

  editLabel() {
    this.label = WID();
  }

  removeValidator() {
    this.requiredValidator = this.requiredValidator == null ? Validators.required : null;
  }

  setValue(value?: string) {
    this.formGroup.patchValue({ test2: 'SETTETET' });
  }

  changeGroup() {
    const newText = (Math.random() * 1000).toString();
    this.formGroup = this._fb.group({ test1: newText, test2: newText + 'ss' });
    this.cd.detectChanges();
  }
}

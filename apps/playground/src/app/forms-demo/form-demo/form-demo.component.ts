import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SdwFormComponent } from '../../../../../../libs/core/src/lib/forms/form/form.component';
let id = 1;
function WID() {
  return String(id++);
}

@Component({
  selector: 'shadow-ui-form-demo',
  templateUrl: './form-demo.component.html',
  styleUrls: ['./form-demo.component.css']
})
export class FormDemoComponent implements OnInit {
  name = 'test1';
  placeholder = 'place';
  label = null;

  formGroup = this._fb.group({});

  requiredValidator = Validators.required;
  minLengthValidator = Validators.minLength(4);

  formResult: any;

  @ViewChild(SdwFormComponent)
  private _formComponent: SdwFormComponent;

    constructor(private _fb: FormBuilder,
                private cd: ChangeDetectorRef) { }

  ngOnInit() {
      this._formComponent.formGroup.valueChanges.subscribe(data => {
        console.warn('DEMO', data);
        this.formResult = data;
        this.cd.detectChanges();
      })
  }

  editPlaceholder() {
    this.placeholder = WID();
  }

  editLabel() {
    this.label = WID();
  }
}

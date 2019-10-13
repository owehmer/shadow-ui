import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { SdwFormElementComponent } from '../form-element.component';
import { hasFormControlRequiredValidator } from '../../helpers';
import { FloatLabelType } from '@angular/material/core';
import { SdwFormComponent } from '../../form/form.component';

export type SdwFormElementTypes = 'number' | 'text' | 'email';

@Component({
  selector: 'sdw-form-input-element, [sdw-form-input-element]',
  templateUrl: './form-input-element.component.html',
  styleUrls: ['./form-input-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'sdw-form-input-element',
  }
})
export class SdwFormInputElementComponent extends SdwFormElementComponent {
  @Input() placeholder: string;
  @Input() floatLabel: FloatLabelType;
  @Input() label: string;
  @Input() type: SdwFormElementTypes = 'text';

  get showRequiredMarker(): boolean {
    return hasFormControlRequiredValidator(this.formControl);
  }

  constructor(form: SdwFormComponent,
              cd: ChangeDetectorRef) {
    super(form, cd);
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this._form.sdwFormGroup$.subscribe(_ => console.warn('AA', _));
  }
}

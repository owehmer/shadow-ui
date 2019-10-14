import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  Input, ViewChild,
} from '@angular/core';
import { SdwFormElementComponent } from '../form-element.component';
import { FloatLabelType } from '@angular/material/core';
import { SdwFormComponent } from '../../form/form.component';
import { MatInput } from '@angular/material/input';

export type SdwFormElementTypes = 'number' | 'text' | 'email';

@Component({
  selector: 'sdw-form-input-element, [sdw-form-input-element]',
  templateUrl: './form-input-element.component.html',
  styleUrls: ['./form-input-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'sdw-form-element sdw-input',
  }
})

export class SdwFormInputElementComponent extends SdwFormElementComponent {
  @Input() placeholder: string;
  @Input() floatLabel: FloatLabelType;
  @Input() label: string;
  @Input() type: SdwFormElementTypes = 'text';

  @ViewChild(MatInput, {static: true}) readonly matInput: MatInput;

  constructor(form: SdwFormComponent,
              cd: ChangeDetectorRef) {
    super(form, cd);
  }
}

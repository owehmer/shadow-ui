import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  Input, ViewChild
} from '@angular/core';
import { SdwFormElementComponent } from '../form-element.component';
import { SdwFormComponent } from '../../form/form.component';
import { ThemePalette } from '@angular/material/core';
import { MatCheckbox } from '@angular/material/checkbox';

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
export class SdwFormCheckboxComponent extends SdwFormElementComponent {
  @Input('aria-label') ariaLabel: string;
  @Input('aria-labelledby') ariaLabelledby: string | null;
  @Input() color: ThemePalette;
  @Input() disableRipple: boolean;
  @Input() labelPosition: 'before' | 'after';

  @Input() label: string;

  @ViewChild(MatCheckbox, {static: true}) readonly matCheckbox: MatCheckbox;

  constructor(form: SdwFormComponent,
              cd: ChangeDetectorRef) {
    super(form, cd);
  }
}

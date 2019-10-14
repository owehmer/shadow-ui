import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ContentChild, Directive,
  Input, OnInit, TemplateRef, ViewChild
} from '@angular/core';
import { SdwFormElementComponent } from '../form-element.component';
import { SdwFormComponent } from '../../form/form.component';
import { MatSelect } from '@angular/material/select';
import { hasFormControlRequiredValidator } from '../../helpers';
import { MatOption } from '@angular/material/core';

export interface SdwFormSelectOption {
  label: string;
  value?: string | number;
  disabled?: boolean;
}

export interface SdwFormSelectGroup {
  label?: string; // If left empty, no grouping will be shown in the panel
  disabled?: boolean;
  options: SdwFormSelectOption[];
}

export function TransformToSimpleOptions(arr: SdwFormSelectOption[]): SdwFormSelectGroup {
  return { options: arr };
}

@Directive({
  selector: '[sdwFormSelectTemplate]'
})
export class SdwFormSelectTemplateDirective {

  constructor(public templateRef: TemplateRef<any>) { }
}

@Component({
  selector: 'sdw-form-select, [sdw-form-select]',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'sdw-form-element sdw-form-select',
  }
})

export class SdwFormSelectComponent extends SdwFormElementComponent implements OnInit {
  @Input('aria-label') ariaLabel = '';
  @Input('aria-labelledby') ariaLabelledby: string;
  @Input() compareWith: (o1: any, o2: any) => boolean;
  @Input() disableOptionCentering = false;
  @Input() disableRipple = false;
  @Input() multiple = false;
  @Input() panelClass: string | string[] | Set<string> | { [key: string]: any; };
  @Input() placeholder = '';
  @Input() sortComparator: (a: MatOption, b: MatOption, options: MatOption[]) => number;
  @Input() typeaheadDebounceInterval: number;

  @Input() label: string;
  @Input() hint: string;

  @Input()
  set options(value: SdwFormSelectGroup[]) {
    this._groupedOptions = value;
  }

  get groupedOptions(): SdwFormSelectGroup[] {
    return this._groupedOptions;
  }

  @ViewChild(MatSelect, {static: true}) readonly matSelect: MatSelect;

  @ContentChild(SdwFormSelectTemplateDirective, {static: true}) templateDir: SdwFormSelectTemplateDirective;

  private _groupedOptions: SdwFormSelectGroup[];

  constructor(form: SdwFormComponent,
              cd: ChangeDetectorRef) {
    super(form, cd);
  }

  ngOnInit(): void {
    super.ngOnInit();

    if (this.compareWith == null) {
      this.compareWith = (o1, o2) => o1 === o2;
    }
  }
}

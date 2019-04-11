import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import { FORM_ELEMENT_DATA, SdwFormElementComponent } from '../form-element.component';
import { interval } from 'rxjs';

export type SdwFormElementTypes = 'number' | 'text' | 'email';

export interface SdwFormInputData {
  placeholder?: string;
  floatLabel?: boolean;
  label?: string;
  type: SdwFormElementTypes;
}

@Component({
  selector: 'sdw-form-input-element',
  templateUrl: './form-input-element.component.html',
  styleUrls: ['./form-input-element.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'sdw-form-input-element',
  }
})
export class SdwFormInputElementComponent {
  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
    this._cd.markForCheck();
  }

  get floatLabel(): boolean {
    return this._floatLabel;
  }

  set floatLabel(value: boolean) {
    this._floatLabel = value;
  }

  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
  }

  get type(): SdwFormElementTypes {
    return this._type;
  }

  set type(value: SdwFormElementTypes) {
    this._type = value;
  }

  private _placeholder: string;
  private _floatLabel: boolean;
  private _label: string;
  private _type: SdwFormElementTypes;

  constructor(@Optional() @Inject(FORM_ELEMENT_DATA) _data: SdwFormInputData,
              private _formElement: SdwFormElementComponent,
              private _cd: ChangeDetectorRef) {
    if (_data) {
      Object.assign(this, _data);
    }
    this._formElement.inputChanged$.subscribe((i: any) => {
      console.warn('i cahnged', i);
      this._placeholder = i.placeholder;
      // this._cd.detectChanges();
    });
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    interval(1000).pipe(

    ).subscribe((i) => {
      this.placeholder = `${i}`;
      console.info('cd', i);
    });
  }

  ngDoCheck() {
    console.warn('CHANGE');
  }
}

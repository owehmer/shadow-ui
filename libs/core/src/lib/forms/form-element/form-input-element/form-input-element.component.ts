import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Optional, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { FORM_ELEMENT_DATA, SdwFormElementComponent } from '../form-element.component';
import { BehaviorSubject, interval } from 'rxjs';
import { FloatLabelType, MatFormField } from '@angular/material';
import { FormControl } from '@angular/forms';
import { hasFormControlRequiredValidator } from '../../helpers';

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
  set placeholder(value: string) {
    this.placeholder$.next(value);
  }

  set floatLabel(value: FloatLabelType) {
    this.floatLabel$.next(value);
  }

  set label(value: string) {
    this.label$.next(value);
  }

  set type(value: SdwFormElementTypes) {
    this.type$.next(value);
  }

  get formControl(): FormControl {
    return this._formElement.formControl;
  }

  get showRequiredMarker(): boolean {
    return hasFormControlRequiredValidator(this.formControl);
  }

  placeholder$ = new BehaviorSubject<string>(null);
  floatLabel$ = new BehaviorSubject<FloatLabelType>('auto');
  label$ = new BehaviorSubject<string>(null);
  type$ = new BehaviorSubject<SdwFormElementTypes>('text');

  constructor(@Optional() @Inject(FORM_ELEMENT_DATA) _data: SdwFormInputData,
              private _formElement: SdwFormElementComponent,
              private _cd: ChangeDetectorRef) {
    this._formElement.componentDataChanged$.subscribe(data => {
      Object.assign(this, data);
    });
  }
}

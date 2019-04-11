import { ChangeDetectorRef, Directive, Input, OnChanges, Self, SimpleChanges } from '@angular/core';
import { SdwFormElementComponent } from '../form-element.component';
import { SdwFormElementTypes, SdwFormInputData, SdwFormInputElementComponent } from './form-input-element.component';

@Directive({
  selector: '[sdwFormInput]'
})
export class SdwFormInputDirective implements OnChanges {
  @Input()
  placeholder: string;

  @Input()
  floatLabel: boolean;

  @Input()
  label: string;

  @Input()
  type: SdwFormElementTypes;

  constructor(@Self() private _formElement: SdwFormElementComponent,
              private _cd: ChangeDetectorRef) {
    this._formElement.componentOrTemplate = SdwFormInputElementComponent;
    this._formElement.componentOrTemplateData = this as SdwFormInputData;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._formElement.inputChanged$.next({placeholder: this.placeholder});
  }
}

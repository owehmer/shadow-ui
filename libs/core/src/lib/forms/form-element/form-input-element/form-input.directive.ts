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
  type: SdwFormElementTypes = 'text';

  constructor(@Self() private _formElement: SdwFormElementComponent,
              private _cd: ChangeDetectorRef) {
    this._formElement.componentOrTemplate = SdwFormInputElementComponent;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const changeMap = {};
    Object.keys(changes).forEach(key => changeMap[key] = changes[key].currentValue);
    this._setFormData(changeMap);
  }

  private _setFormData(dataMap: {[property: string]: any}) {
    this._formElement.componentOrTemplateData = dataMap as SdwFormInputData;
  }
}

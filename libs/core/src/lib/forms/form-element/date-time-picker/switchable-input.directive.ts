import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Optional,
  Output,
  Self
} from '@angular/core';

@Directive({
  selector: '[sdwSwitchableInput]'
})
export class SwitchableInputDirective {
  @Input() preInputCtrl: HTMLInputElement;
  @Input() postInputCtrl: HTMLInputElement;
  @Input() autoFillSize = true;
  @Input() bgColor: string;

  @Output() blurValueChange = new EventEmitter<string>();

  @HostBinding('class.empty-input')
  get inputIsEmpty(): boolean {
    const element = this._elementRef.nativeElement;
    const value = element.value;
    return !value;
  }

  get inputIsFilled(): boolean {
    const element = this._elementRef.nativeElement;
    const value = element.value;
    const size = element.size || 2;
    return !this.inputIsEmpty && value.length === size;
  }

  @HostBinding('style.background-color')
  get showBgColor(): string {
    return !this.inputIsFilled && this.bgColor ? this.bgColor : undefined;
  }

  constructor(
    @Self() private _elementRef: ElementRef<HTMLInputElement>
  ) {
  }

  @HostListener('blur')
  blurEvent() {
    const element = this._elementRef.nativeElement;
    const value = element.value;
    const size = element.size || 2;

    if (value.length > 0 && value.length < size) {
      const newVal = new Array(size - value.length).fill('0').join('') + value;
      this.blurValueChange.emit(newVal);
    }
  }

  @HostListener('keydown.arrowLeft', ['$event'])
  arrowLeftEvent(event: Event) {
    if (this.preInputCtrl == null || this._elementRef.nativeElement.selectionStart !== 0) {
      return;
    }

    this.preInputCtrl.focus();
    const currPreCtrlValueLength = this.preInputCtrl.value.length;

    setTimeout(() => {
      this.preInputCtrl.selectionStart = currPreCtrlValueLength;
      this.preInputCtrl.selectionEnd = currPreCtrlValueLength;
    });
  }

  @HostListener('keydown.arrowRight', ['$event'])
  arrowRightEvent(event: Event) {
    const valueLength = this._elementRef.nativeElement.value.length;
    if (this.postInputCtrl == null || this._elementRef.nativeElement.selectionStart !== valueLength) {
      return;
    }

    this.postInputCtrl.focus();
    setTimeout(() => {
      this.postInputCtrl.selectionStart = 0;
      this.postInputCtrl.selectionEnd = 0;
    });
  }

}

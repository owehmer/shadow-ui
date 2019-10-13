import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { SdwDialogBase } from '../../dialog-base';
import { MatMenuTrigger } from '@angular/material/menu';

export interface SdwExtendedOkItem<T = any> {
  icon?: string;
  text: string;
  fn: (item: SdwExtendedOkItem<T>, dialogBase: SdwDialogBase) => void;
  data?: T;
}

export interface SdwExtendedOkConfig {
  type: 'button' | 'icon';
  display: string; // Button text or icon
  clickFn?: (dialogBase: SdwDialogBase) => void;
  disabled?: boolean;
  items?: SdwExtendedOkItem[];
}

@Component({
  selector: 'sdw-extended-ok',
  templateUrl: './extended-ok.component.html',
  styleUrls: ['./extended-ok.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'sdw-extended-ok'
  }
})
export class SdwExtendedOkComponent {
  @Input()
  config: SdwExtendedOkConfig;

  @Input()
  disabled: boolean;

  @ViewChild(MatMenuTrigger, {static: true})
  private _trigger: MatMenuTrigger;

  constructor(private _dialog: SdwDialogBase) {
  }

  buttonClick() {
    if (this.config.clickFn)
      this.config.clickFn(this._dialog);

    if (this.config.items)
      this._trigger.toggleMenu();
  }

  selectClick(item: SdwExtendedOkItem) {
    if (item.fn)
      item.fn(item.data, this._dialog);
  }
}

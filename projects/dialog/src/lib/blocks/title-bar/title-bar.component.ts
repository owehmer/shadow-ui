import {
  ChangeDetectionStrategy,
  Component, ElementRef, EventEmitter, HostBinding, Inject, InjectionToken,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { isNullOrEmpty } from '../../helper';
import { DataThatChanges } from '../../dialog-content-api';
import { SdwExtendedOkConfig } from '../extended-ok/extended-ok.component';

export interface SdwDialogTitleSettings {
  iconSource: 'font' | 'svg';
}

export const SDW_DLG_TITLE_SETTINGS = new InjectionToken<SdwDialogTitleSettings>('sdwDialogTitleSettings');

export const SDW_DEFAULT_DLG_TITLE_SETTINGS: SdwDialogTitleSettings = {
  iconSource: 'font'
};

@Component({
  selector: 'sdw-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'sdw-title-bar'
  }
})
export class SdwTitleBarComponent implements OnChanges {
  @HostBinding('class.sdw-simple-title-bar')
  @Input()
  public useSimpleTitleBar = false;

  @Input()
  public titleColor: 'primary' | 'accent' | 'warn' = 'primary';

  @Input()
  public hasChanges = false;

  @Input()
  public leftIcons: DataThatChanges<string>;

  @Input()
  public rightIcons: DataThatChanges<string>;

  @Input()
  public disabled = false;

  @Input()
  public displayButtons = true;

  @Input()
  extendedConfig: SdwExtendedOkConfig;

  @Output()
  public buttonClick = new EventEmitter<boolean>();

  public leftIcon?: string;
  public rightIcon?: string;

  constructor(@Inject(SDW_DLG_TITLE_SETTINGS) public settings: SdwDialogTitleSettings,
              public elementRef: ElementRef<HTMLElement>) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const hasChanges = this.getCurrentValue<boolean>(changes, 'hasChanges');
    const leftIcons = this.getCurrentValue<DataThatChanges<string>>(changes, 'leftIcons');
    const rightIcons = this.getCurrentValue<DataThatChanges<string>>(changes, 'rightIcons');

    this.leftIcon = this.displayIcon(leftIcons, hasChanges);
    this.rightIcon = this.displayIcon(rightIcons, hasChanges);
  }

  iconClicked(isOkBtn: boolean) {
    this.buttonClick.emit(isOkBtn);
  }

  private displayIcon(icon: DataThatChanges<string>, hasChanges: boolean) {
    if (!icon)
      return undefined;

    const chosenIcon = hasChanges ? icon.changed : icon.unchanged;
    return isNullOrEmpty(chosenIcon) ? undefined : chosenIcon;
  }

  private getCurrentValue<T>(changes: SimpleChanges, propKey: string): T {
    return changes[propKey] ? changes[propKey].currentValue : this[propKey];
  }
}

import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { isNullOrEmpty } from '../helper';
import { DataThatChanges } from '../dialog-content-api';

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

  public leftIcon?: string;
  public rightIcon?: string;

  public get isTitleCentered() {
    return this.leftIcon || this.rightIcon;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const hasChanges = this.getCurrentValue<boolean>(changes, 'hasChanges');
    const leftIcons = this.getCurrentValue<DataThatChanges<string>>(changes, 'leftIcons');
    const rightIcons = this.getCurrentValue<DataThatChanges<string>>(changes, 'rightIcons');

    this.leftIcon = this.displayIcon(leftIcons, hasChanges);
    this.rightIcon = this.displayIcon(rightIcons, hasChanges);
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

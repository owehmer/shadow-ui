import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter, HostBinding,
  Input, OnChanges,
  Output, SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'sdw-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'sdw-footer mat-dialog-actions'
  }
})
export class SdwFooterComponent implements OnChanges {
  @Input()
  abortBtnText = 'Abort';

  @Input()
  okBtnText = 'Save';

  @Input()
  showAbortBtn = true;

  @Input()
  abortBtnDisabled = false;

  @Input()
  showOkBtn = true;

  @Input()
  okBtnDisabled = false;

  @Input()
  topBorder = true;

  @Output()
  buttonClick = new EventEmitter<boolean>();

  @HostBinding('class.with-top-border')
  showTopBorder = true;

  ngOnChanges(changes: SimpleChanges): void {
    const showAbortBtn = this.getCurrentValue<boolean>(changes, 'showAbortBtn');
    const showOkBtn = this.getCurrentValue<boolean>(changes, 'showOkBtn');
    const topBorder = this.getCurrentValue<boolean>(changes, 'topBorder');

    this.showTopBorder = (showAbortBtn || showOkBtn) && topBorder;
  }

  buttonClicked(isOkBtn: boolean) {
    this.buttonClick.emit(isOkBtn);
  }

  private getCurrentValue<T>(changes: SimpleChanges, propKey: string): T {
    return changes[propKey] ? changes[propKey].currentValue : this[propKey];
  }
}

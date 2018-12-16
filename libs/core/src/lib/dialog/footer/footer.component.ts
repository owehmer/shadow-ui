import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
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
export class SdwFooterComponent {
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

  @Output()
  buttonClick = new EventEmitter<boolean>();

  buttonClicked(isOkBtn: boolean) {
    this.buttonClick.emit(isOkBtn);
  }
}

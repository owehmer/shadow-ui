import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'sdw-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'sdw-content mat-dialog-content'
  }
})
export class SdwContentComponent {
  @HostBinding('class.sdw-content-padded')
  @Input()
  padded = true;

  private readonly _titleHeight = 64;
  private readonly _footerHeight = 52;

  constructor(private sanitizer: DomSanitizer,
              private dialogRef: MatDialogRef<any>) {
  }

  /**
   * Adapt styles set in the config so the content doesn't overflow.
   */
  @HostBinding('style')
  get getContentStyles(): SafeStyle {
    const _config = this.dialogRef._containerInstance._config;
    const heightSubtraction = `${this._titleHeight + this._footerHeight}px`;

    const height = _config.height && _config.height !== ''
      ? `calc(${_config.height} - ${heightSubtraction})`
      : undefined;

    const maxHeight = _config.maxHeight ? `calc(${_config.maxHeight} - ${heightSubtraction})` : undefined;
    const minHeight = _config.minHeight ? `calc(${_config.minHeight} - ${heightSubtraction})` : undefined;

    return this.sanitizer.bypassSecurityTrustStyle(
      `height: ${height}; max-height: ${maxHeight}; min-height: ${minHeight}`
    );
  }
}

import { ChangeDetectionStrategy, Component, HostBinding, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';

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

  @Input()
  titleBarHeight = 64;

  private readonly _footerHeight = 52;

  constructor(private sanitizer: DomSanitizer,
              private dialogRef: MatDialogRef<any>,
              private _bpObserver: BreakpointObserver) {
  }

  /**
   * Adapt styles set in the config so the content doesn't overflow.
   */
  @HostBinding('style')
  get getContentStyles(): SafeStyle {
    const _config = this.dialogRef._containerInstance._config;
    const heightSubtraction = `${this.titleBarHeight + this._footerHeight}px`;

    const height = _config.height && _config.height !== ''
      ? `calc(${_config.height} - ${heightSubtraction})`
      : undefined;

    const maxHeight = _config.maxHeight ? `calc(${_config.maxHeight} - ${heightSubtraction})` : `calc(100vh - ${heightSubtraction})`;
    const minHeight = _config.minHeight ? `calc(${_config.minHeight} - ${heightSubtraction})` : undefined;

    return this.sanitizer.bypassSecurityTrustStyle(
      `height: ${height}; max-height: ${maxHeight}; min-height: ${minHeight}`
    );
  }
}

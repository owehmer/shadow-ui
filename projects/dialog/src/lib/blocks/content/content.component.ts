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
export class SdwContentComponent implements OnDestroy {
  @HostBinding('class.sdw-content-padded')
  @Input()
  padded = true;

  private _titleHeight = 64; // 56
  private readonly _footerHeight = 52;

  private _titleHeight$$: Subscription;

  constructor(private sanitizer: DomSanitizer,
              private dialogRef: MatDialogRef<any>,
              private _bpObserver: BreakpointObserver) {
    // The Material Toolbar is bigger in non HandsetPortrait
    this._titleHeight$$ = this._bpObserver.observe([Breakpoints.HandsetPortrait]).pipe(
      distinctUntilChanged((preResult, nowResult) => preResult.matches === nowResult.matches)
    ).subscribe(result => this._titleHeight = result.matches ? 56 : 64);
  }

  ngOnDestroy(): void {
    this._titleHeight$$.unsubscribe();
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

    const maxHeight = _config.maxHeight ? `calc(${_config.maxHeight} - ${heightSubtraction})` : `calc(100vh - ${heightSubtraction})`;
    const minHeight = _config.minHeight ? `calc(${_config.minHeight} - ${heightSubtraction})` : undefined;

    return this.sanitizer.bypassSecurityTrustStyle(
      `height: ${height}; max-height: ${maxHeight}; min-height: ${minHeight}`
    );
  }
}

import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { coerceArray } from '@angular/cdk/coercion';

export abstract class DialogBuilder<D = any> {
  protected _config: MatDialogConfig<any>;

  constructor(protected _dialogService: MatDialog, _config: MatDialogConfig<any> = null) {
    this._config = this._config ? this._config : new MatDialogConfig();
    this._config.role = this._config.role ? this._config.role : 'dialog';
    this._config.hasBackdrop = this._config.hasBackdrop ? this._config.hasBackdrop : true;
    // this._config.backdropClass = 'cdk-overlay-dark-backdrop sdw-backdrop';
    this._config.disableClose = this._config.disableClose != null ? this._config.disableClose : false;
  }

  setBackdropClickCanClose(allow = true) {
    this._config.disableClose = !allow;
    return this;
  }

  setDimensions(width?: string, height?: string) {
    this._config.width = width ? width : this._config.width;
    this._config.height = height ? height : this._config.height;
    return this;
  }

  setMinDimensions(width?: string, height?: string) {
    this._config.minWidth = width ? width : this._config.minWidth;
    this._config.minHeight = height ? height : this._config.minHeight;
    return this;
  }

  setMaxDimensions(width?: string, height?: string) {
    this._config.maxWidth = width ? width : this._config.maxWidth;
    this._config.maxHeight = height ? height : this._config.maxHeight;
    return this;
  }

  setPanelClasses(classes: string | string[]) {
    this._config.panelClass = coerceArray(classes);
    return this;
  }

  abstract setDialogData(data: D): DialogBuilder;

  abstract open(): MatDialogRef<any, any>;
}



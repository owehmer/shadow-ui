import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { coerceArray } from '@angular/cdk/coercion';

export abstract class SdwDialogBuilder<D = any> {
  protected _config: MatDialogConfig<any>;

  constructor(protected _dialogService: MatDialog, _config: MatDialogConfig<any> = null) {
    this._config = _config ? _config : new MatDialogConfig();
    this._config.role = this._config.role ? this._config.role : 'dialog';
    this._config.hasBackdrop = this._config.hasBackdrop ? this._config.hasBackdrop : true;
    this._config.disableClose = true; // Use own property to check backdrop click close
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

  setPanelClasses(classes?: string | string[]) {
    const inputArr = coerceArray(classes);

    const ownClass = 'sdw-cdk-dialog';

    if (inputArr.findIndex(i => i === ownClass) === -1)
      inputArr.push(ownClass);

    this._config.panelClass = inputArr;
    return this;
  }

  abstract setBackdropClickCanClose(allow: boolean): SdwDialogBuilder;

  abstract setDialogData(data: D): SdwDialogBuilder;

  abstract open(): MatDialogRef<any, any>;
}



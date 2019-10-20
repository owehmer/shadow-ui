import { ChangeDetectionStrategy, Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import {DialogWithAbort, DialogWithOk, DialogWithOpenChanges, DialogWithResult, SdwAdvancedDialogComponent} from '@shadowui/dialog';

@Component({
  selector: 'app-my-content',
  templateUrl: './my-content.component.html',
  styleUrls: ['./my-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyContentComponent implements DialogWithAbort, DialogWithOk, DialogWithOpenChanges, DialogWithResult {
  changes$: Subject<boolean> = new Subject<boolean>();

  public lastChange = false;

  private _result: any = {
    myContent: 'return some interesting results'
  };

  constructor(@Optional() public dialogRef: MatDialogRef<SdwAdvancedDialogComponent>,
              @Optional() public dlg: SdwAdvancedDialogComponent,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  onAbort(): Observable<boolean> | Promise<boolean> | boolean {
    Object.assign(this._result, {abort: 'whoops'});

    const retval = new Promise<boolean>(((resolve, reject) => {
      setTimeout(() => resolve(true), 1000);
    }));

    return retval;
  }

  onOk(): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  public trigger() {
    this.changes$.next(true);
    this.lastChange = !this.lastChange;
  }

  getResult(): Observable<any> | Promise<any> | any {
    return this._result;
  }
}

import { ChangeDetectionStrategy, Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  DialogWithAbort,
  DialogWithOk,
  DialogWithOpenChanges,
  SdwAdvancedDialogComponent,
  SdwSimpleDialogComponent
} from '@shadow-ui/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-my-content',
  templateUrl: './my-content.component.html',
  styleUrls: ['./my-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyContentComponent implements DialogWithAbort, DialogWithOk, DialogWithOpenChanges {
  changes$: Subject<boolean> = new Subject<boolean>();

  public lastChange = false;


  constructor(@Optional() public dialogRef: MatDialogRef<SdwSimpleDialogComponent>,
              @Optional() public dlg: SdwAdvancedDialogComponent,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  onAbort(): Observable<boolean> | Promise<boolean> | boolean {
    const retval = new Promise<boolean>(((resolve, reject) => {
      setTimeout(() => resolve(true), 1000);
    }));

    return retval;
  }

  onOk(): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  public trigger(val?: string) {
    console.warn(val, !this.lastChange);
    this.changes$.next(true);
    this.lastChange = !this.lastChange;
  }
}

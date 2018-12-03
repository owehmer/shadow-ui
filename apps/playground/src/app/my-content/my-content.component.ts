import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  DialogWithAbort,
  DialogWithOk,
  DialogWithOpenChanges,
  MaterialDialogComponent,
  SimpleDialogComponent
} from '@shadow-ui/dialog';
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

  public trigger(val?: string) {
    console.warn(val, !this.lastChange);
    this.changes$.next(true);
    this.lastChange = !this.lastChange;
  }



  constructor(public dialogRef: MatDialogRef<SimpleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dlg: MaterialDialogComponent) {

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
}

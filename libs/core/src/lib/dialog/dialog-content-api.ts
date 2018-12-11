import { Observable, Subject } from 'rxjs';

export interface DialogWithOk {
  onOk(): Observable<boolean> | Promise<boolean> | boolean;
}

export interface DialogWithAbort {
  onAbort(): Observable<boolean> | Promise<boolean> | boolean;
}

export interface DialogWithResult<R = any> {
  getResult(): Observable<R> | Promise<R> | R;
}

/**
 * Send 'true' to set dialog in change-mode. Send 'false' to reset the mode.
 */
export interface DialogWithOpenChanges {
  changes$: Subject<boolean>;
}

export type SdwCloseMode = 'backdrop' | 'abort' | 'confirm';

export interface SdwDialogCloseResult<R = any> {
  mode: SdwCloseMode;
  result: R;
}

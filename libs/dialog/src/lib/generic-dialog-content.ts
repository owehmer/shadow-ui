import { Observable, of, Subject } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

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

export function dlgOkFn(instance: DialogWithOk, noFnReturnValue = true) {
  return instance != null && isFn(instance.onOk) ? instance.onOk() : noFnReturnValue;
}

export function dlgAbortFn(instance: DialogWithAbort, noFnReturnValue = true) {
  return instance != null && isFn(instance.onAbort) ? instance.onAbort() : noFnReturnValue;
}

export function dlgGetResult(instance: DialogWithResult) {
  return instance != null && isFn(instance.getResult) ? instance.getResult() : undefined;
}

export function dlgHasChanges(instance: DialogWithOpenChanges, callbackFn: (val) => void) {
  if (callbackFn != null &&
    instance != null &&
    instance.changes$ != null &&
    instance.changes$ instanceof Subject &&
    !instance.changes$.closed) {
    return instance.changes$.subscribe(callbackFn);
  }
  return undefined;
}

function isFn(fn: any) {
  return fn != null && fn instanceof Function;
}

/**
 * If canClose is an Observable of a Promise it will wait for its result and
 * then runs the callback function provided with the evaluated result.
 * @param valueToDetermine
 * @param callbackFn Function that is run after canClose value is determined.
 */
export function determineValue(valueToDetermine: Observable<boolean> | Promise<boolean> | boolean,
                               callbackFn?: (canCloseVal: boolean) => void): void {
  if (typeof valueToDetermine === 'boolean') {
    callbackFn(valueToDetermine);

  } else if (valueToDetermine instanceof Observable) {
    valueToDetermine.pipe(
      take(1),
      catchError((err) => of(false))
    ).subscribe((retVal) => callbackFn(retVal));

  } else {
    valueToDetermine
      .then((retVal) => callbackFn(retVal))
      .catch((ex) => callbackFn(false));
  }
}

export function isNullOrEmpty(text?: string) {
  return text == null || text === '';
}

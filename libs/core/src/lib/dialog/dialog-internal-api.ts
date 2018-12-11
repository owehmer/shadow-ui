import { Observable, Subject, Subscription } from 'rxjs';
import { DialogWithAbort, DialogWithOk, DialogWithOpenChanges, DialogWithResult } from './dialog-content-api';
import { isFn } from './helper';

export function dlgOkFn(instance: DialogWithOk, noFnReturnValue = true): boolean | Promise<boolean> | Observable<boolean> {
  return instance != null && isFn(instance.onOk) ? instance.onOk() : noFnReturnValue;
}

export function dlgAbortFn(instance: DialogWithAbort, noFnReturnValue = true): boolean | Promise<boolean> | Observable<boolean> {
  return instance != null && isFn(instance.onAbort) ? instance.onAbort() : noFnReturnValue;
}

export function dlgGetResult(instance: DialogWithResult): boolean | Promise<boolean> | Observable<boolean> {
  return instance != null && isFn(instance.getResult) ? instance.getResult() : undefined;
}

export function dlgHasChanges(instance: DialogWithOpenChanges, callbackFn: (val) => void): Subscription {
  if (callbackFn != null &&
    instance != null &&
    instance.changes$ != null &&
    instance.changes$ instanceof Subject &&
    !instance.changes$.closed) {
    return instance.changes$.subscribe(callbackFn);
  }
  return undefined;
}

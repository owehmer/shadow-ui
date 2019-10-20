import { from, Observable, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

export function isFn(fn: any) {
  return fn != null && fn instanceof Function;
}

export function convertToObs(valueToDetermine: Observable<boolean> | Promise<boolean> | boolean): Observable<boolean> {
  if (typeof valueToDetermine === 'boolean') {
    return of(valueToDetermine);
  } else if (valueToDetermine instanceof Observable) {
    return valueToDetermine;
  } else {
    return from(valueToDetermine);
  }
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

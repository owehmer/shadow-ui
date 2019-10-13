import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'sdw-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'sdw-form',
  }
})
export class SdwFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  set sdwFormGroup(value: FormGroup) {
    if (value != null) {
      this._sdwFormGroup$.next(value);
    }
  }

  get sdwFormGroup(): FormGroup {
    return this._sdwFormGroup$.getValue();
  }

  get sdwFormGroup$(): Observable<FormGroup> {
    return this._sdwFormGroup$.asObservable();
  }

  get valueChanges$(): Observable<any> {
    return this._sdwFormGroup$.pipe(
      switchMap(group => group.valueChanges.pipe(
        filter(_ => this._init)
      ))
    );
  }

  private _sdwFormGroup$ = new BehaviorSubject<FormGroup>(this._fb.group({}));

  private _init = false;
  private _destroyed$ = new Subject();

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this._sdwFormGroup$.pipe(
      takeUntil(this._destroyed$)
    ).subscribe(group => group.patchValue(group.getRawValue()));
  }

  ngAfterViewInit(): void {
    this._init = true;
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, ElementRef,
  Input,
  OnDestroy,
  OnInit, Optional, Self, ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SdwDynGridContainerDirective } from '@shadowui/utils';

@Component({
  selector: 'sdw-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'sdw-form'
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

  @ViewChild('formRef', { static: true })
  private _formRef: ElementRef;

  private _sdwFormGroup$ = new BehaviorSubject<FormGroup>(this._fb.group({}));

  private _init = false;
  private _destroyed$ = new Subject();

  constructor(private _fb: FormBuilder,
              @Self() @Optional() private _gridContainer: SdwDynGridContainerDirective) {
  }

  ngOnInit() {
    this._sdwFormGroup$.pipe(
      takeUntil(this._destroyed$)
    ).subscribe(group => group.patchValue(group.getRawValue()));
  }

  ngAfterViewInit(): void {
    if (this._gridContainer) {
      this._gridContainer.elementRef = this._formRef;
    }
    this._init = true;
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}

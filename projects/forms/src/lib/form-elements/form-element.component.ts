import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  Input,
  OnChanges, OnDestroy, OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {SdwFormComponent} from '../form.component';
import {AbstractControl, AsyncValidatorFn, FormControl, ValidatorFn} from '@angular/forms';
import {Subject} from 'rxjs';
import {skip, takeUntil} from 'rxjs/operators';
import {hasFormControlRequiredValidator} from '../helpers';

@Component({
  selector: 'sdw-form-element',
  template: `
      <ng-content></ng-content>`,
  styles: [':host { display: block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'sdw-form-elements'
  }
})
export class SdwFormElementComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() name: string;
  @Input() validatorOrOpts: ValidatorFn | ValidatorFn[];
  @Input() asyncValidator: AsyncValidatorFn | AsyncValidatorFn[];

  formControl: AbstractControl;

  get showRequiredMarker(): boolean {
    return hasFormControlRequiredValidator(this.formControl);
  }

  protected _destroyed$ = new Subject();

  constructor(protected _form: SdwFormComponent,
              protected _cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this._form.sdwFormGroup$.pipe(
      skip(1),
      takeUntil(this._destroyed$)
    ).subscribe(group => {
      const existingFormCtrl = group.get(this.name);
      if (existingFormCtrl) {
        this.formControl = existingFormCtrl;
      } else {
        this.formControl = new FormControl(undefined);
        this._form.sdwFormGroup.addControl(this.name, this.formControl);
      }

      if (this.validatorOrOpts != null) {
        this.formControl.setValidators(this.validatorOrOpts);
      }
      if (this.asyncValidator != null) {
        this.formControl.setAsyncValidators(this.asyncValidator);
      }

      this._cd.markForCheck();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const name = changes['name'];
    const validatorOrOpts = changes['validatorOrOpts'];
    const asyncValidator = changes['asyncValidator'];

    if (name != null) {
      const currValue = this.formControl ? this.formControl.value : undefined;

      if (name.previousValue !== undefined) {
        this._form.sdwFormGroup.removeControl(name.previousValue);
      }

      const existingFormCtrl = this._form.sdwFormGroup.get(name.currentValue);
      if (existingFormCtrl) {
        this.formControl = existingFormCtrl;
      } else {
        if (this.formControl === undefined) {
          this.formControl = new FormControl(currValue);
        }
        this._form.sdwFormGroup.addControl(name.currentValue, this.formControl);
      }
    }
    if (validatorOrOpts != null) {
      this.formControl.setValidators(validatorOrOpts.currentValue);
    }
    if (asyncValidator != null) {
      this.formControl.setAsyncValidators(asyncValidator.currentValue);
    }
  }

  ngAfterViewInit(): void {
    if (this.name == null) {
      throw new Error('You need to pass in a name into a SdwFormElementComponent to init this component!');
    }

    // if (this.formControl == null)
    //   throw new Error(`Can't create an instance of SdwFormElementComponent. The content has no FormControl!`);
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}

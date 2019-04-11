import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { filter } from 'rxjs/operators';

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
export class SdwFormComponent implements OnInit, AfterViewInit {
  formGroup = this._fb.group({});

  private _init = false;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.formGroup.valueChanges.pipe(
      filter(_ => this._init)
    ).subscribe(v => console.warn('SDW-FORM VALUE CHANGE', this.formGroup.getRawValue()));
  }

  ngAfterViewInit(): void {
    this._init = true;
  }
}

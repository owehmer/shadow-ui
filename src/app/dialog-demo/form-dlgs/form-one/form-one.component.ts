import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {DialogWithOk} from '@shadowui/dialog';

@Component({
  selector: 'shadow-ui-form-one',
  templateUrl: './form-one.component.html',
  styleUrls: ['./form-one.component.scss']
})
export class FormOneComponent implements OnInit, DialogWithOk {
  static ID = 0;
  profileForm = this._fb.group({
    firstName: ['', Validators.required],
    lastName: ['']
  });

  private readonly _id = FormOneComponent.ID++;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
  }

  isValid(): boolean {
    console.warn('checking validity', this._id, this.profileForm.valid);
    return this.profileForm.valid;
  }

  onOk(): Observable<boolean> | Promise<boolean> | boolean {
    return this.profileForm.valid;
  }


}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdwFormCheckboxComponent } from './form-checkbox.component';

describe('SdwFormInputElementComponent', () => {
  let component: SdwFormCheckboxComponent;
  let fixture: ComponentFixture<SdwFormCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdwFormCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdwFormCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

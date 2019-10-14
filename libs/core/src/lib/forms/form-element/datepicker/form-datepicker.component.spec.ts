import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdwFormDatepickerComponent } from './form-datepicker.component';

describe('SdwFormInputElementComponent', () => {
  let component: SdwFormDatepickerComponent;
  let fixture: ComponentFixture<SdwFormDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdwFormDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdwFormDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

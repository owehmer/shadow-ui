import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdwFormDateTimePickerComponent } from './form-date-time-picker.component';

describe('SdwFormInputElementComponent', () => {
  let component: SdwFormDateTimePickerComponent;
  let fixture: ComponentFixture<SdwFormDateTimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdwFormDateTimePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdwFormDateTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

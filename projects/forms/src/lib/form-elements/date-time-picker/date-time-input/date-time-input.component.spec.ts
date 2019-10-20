import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdwDateTimeInputComponent } from './date-time-input.component';

describe('TimeInputComponent', () => {
  let component: SdwDateTimeInputComponent;
  let fixture: ComponentFixture<SdwDateTimeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdwDateTimeInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdwDateTimeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

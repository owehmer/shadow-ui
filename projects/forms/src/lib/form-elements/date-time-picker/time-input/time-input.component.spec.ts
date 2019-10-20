import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdwTimeInputComponent } from './time-input.component';

describe('TimeInputComponent', () => {
  let component: SdwTimeInputComponent;
  let fixture: ComponentFixture<SdwTimeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdwTimeInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdwTimeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

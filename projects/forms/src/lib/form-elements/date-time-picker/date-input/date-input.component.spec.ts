import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdwDateInputComponent } from './date-input.component';

describe('DateInputComponent', () => {
  let component: SdwDateInputComponent;
  let fixture: ComponentFixture<SdwDateInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdwDateInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdwDateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

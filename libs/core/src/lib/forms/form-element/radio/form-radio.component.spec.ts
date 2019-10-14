import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdwFormRadioComponent } from './form-radio.component';

describe('SdwFormInputElementComponent', () => {
  let component: SdwFormRadioComponent;
  let fixture: ComponentFixture<SdwFormRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdwFormRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdwFormRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdwFormInputElementComponent } from './form-input-element.component';

describe('SdwFormInputElementComponent', () => {
  let component: SdwFormInputElementComponent;
  let fixture: ComponentFixture<SdwFormInputElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdwFormInputElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdwFormInputElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

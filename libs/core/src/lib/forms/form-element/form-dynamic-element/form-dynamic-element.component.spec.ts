import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdwFormDynamicElementComponent } from './form-dynamic-element.component';

describe('FormCustomElementComponent', () => {
  let component: SdwFormDynamicElementComponent;
  let fixture: ComponentFixture<SdwFormDynamicElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdwFormDynamicElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdwFormDynamicElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

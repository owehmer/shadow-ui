import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdwFormElementComponent } from './form-element.component';

describe('SdwFormElementComponent', () => {
  let component: SdwFormElementComponent;
  let fixture: ComponentFixture<SdwFormElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdwFormElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdwFormElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdwFormTextareaElementComponent } from './form-textarea-element.component';

describe('SdwFormTextareaElementComponent', () => {
  let component: SdwFormTextareaElementComponent;
  let fixture: ComponentFixture<SdwFormTextareaElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdwFormTextareaElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdwFormTextareaElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

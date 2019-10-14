import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdwFormSelectComponent } from './form-select.component';

describe('SdwFormInputElementComponent', () => {
  let component: SdwFormSelectComponent;
  let fixture: ComponentFixture<SdwFormSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdwFormSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdwFormSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

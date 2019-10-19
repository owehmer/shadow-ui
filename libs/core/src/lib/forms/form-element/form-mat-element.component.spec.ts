import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdwFormMaterialElementComponent } from './form-mat-element.component';

describe('SdwFormMaterialElementComponent', () => {
  let component: SdwFormMaterialElementComponent;
  let fixture: ComponentFixture<SdwFormMaterialElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdwFormMaterialElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdwFormMaterialElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdwExtendedOkComponent } from './extended-ok.component';

describe('SdwExtendedOkComponent', () => {
  let component: SdwExtendedOkComponent;
  let fixture: ComponentFixture<SdwExtendedOkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdwExtendedOkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdwExtendedOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

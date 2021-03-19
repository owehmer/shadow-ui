import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SdwExtendedOkComponent } from './extended-ok.component';

describe('SdwExtendedOkComponent', () => {
  let component: SdwExtendedOkComponent;
  let fixture: ComponentFixture<SdwExtendedOkComponent>;

  beforeEach(waitForAsync(() => {
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

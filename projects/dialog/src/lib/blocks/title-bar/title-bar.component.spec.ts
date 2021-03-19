import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SdwTitleBarComponent } from './title-bar.component';

describe('SdwTitleBarComponent', () => {
  let component: SdwTitleBarComponent;
  let fixture: ComponentFixture<SdwTitleBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SdwTitleBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdwTitleBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

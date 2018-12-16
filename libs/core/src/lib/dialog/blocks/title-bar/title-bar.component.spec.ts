import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdwTitleBarComponent } from './title-bar.component';

describe('SdwTitleBarComponent', () => {
  let component: SdwTitleBarComponent;
  let fixture: ComponentFixture<SdwTitleBarComponent>;

  beforeEach(async(() => {
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

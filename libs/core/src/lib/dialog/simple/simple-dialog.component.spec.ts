import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdwSimpleDialogComponent } from './simple-dialog.component';

describe('SdwSimpleDialogComponent', () => {
  let component: SdwSimpleDialogComponent;
  let fixture: ComponentFixture<SdwSimpleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdwSimpleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdwSimpleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

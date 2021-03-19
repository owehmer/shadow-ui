import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SdwStepDialogComponent } from './step-dialog.component';

describe('SdwStepDialogComponent', () => {
  let component: SdwStepDialogComponent;
  let fixture: ComponentFixture<SdwStepDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SdwStepDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdwStepDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

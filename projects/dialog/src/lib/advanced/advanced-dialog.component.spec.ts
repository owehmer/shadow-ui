import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SdwAdvancedDialogComponent } from './advanced-dialog.component';

describe('SdwAdvancedDialogComponent', () => {
  let component: SdwAdvancedDialogComponent;
  let fixture: ComponentFixture<SdwAdvancedDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SdwAdvancedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdwAdvancedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed, waitForAsync } from '@angular/core/testing';
import { SdwDialogModule } from './dialog.module';

describe('SdwDialogModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SdwDialogModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SdwDialogModule).toBeDefined();
  });
});

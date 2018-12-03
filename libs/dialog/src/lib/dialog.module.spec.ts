import { async, TestBed } from '@angular/core/testing';
import { SdwDialogModule } from './dialog.module';

describe('SdwDialogModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SdwDialogModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SdwDialogModule).toBeDefined();
  });
});

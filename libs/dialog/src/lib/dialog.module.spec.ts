import { async, TestBed } from '@angular/core/testing';
import { ShadowUiDialogModule } from './dialog.module';

describe('ShadowUiDialogModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ShadowUiDialogModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ShadowUiDialogModule).toBeDefined();
  });
});

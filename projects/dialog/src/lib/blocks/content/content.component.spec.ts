import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SdwContentComponent } from './content.component';

describe('SdwContentComponent', () => {
  let component: SdwContentComponent;
  let fixture: ComponentFixture<SdwContentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SdwContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdwContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

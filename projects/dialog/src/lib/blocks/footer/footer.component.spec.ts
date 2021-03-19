import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SdwFooterComponent } from './footer.component';

describe('SdwFooterComponent', () => {
  let component: SdwFooterComponent;
  let fixture: ComponentFixture<SdwFooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SdwFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdwFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdwFooterComponent } from './footer.component';

describe('SdwFooterComponent', () => {
  let component: SdwFooterComponent;
  let fixture: ComponentFixture<SdwFooterComponent>;

  beforeEach(async(() => {
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

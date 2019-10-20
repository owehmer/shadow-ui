import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdwFormComponent } from './form.component';

describe('SdwFormComponent', () => {
  let component: SdwFormComponent;
  let fixture: ComponentFixture<SdwFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdwFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdwFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

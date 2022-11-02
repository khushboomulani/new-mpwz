import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtiActComponent } from './rti-act.component';

describe('RtiActComponent', () => {
  let component: RtiActComponent;
  let fixture: ComponentFixture<RtiActComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtiActComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtiActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

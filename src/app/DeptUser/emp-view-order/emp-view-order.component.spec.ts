import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpViewOrderComponent } from './emp-view-order.component';

describe('EmpViewOrderComponent', () => {
  let component: EmpViewOrderComponent;
  let fixture: ComponentFixture<EmpViewOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpViewOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpViewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

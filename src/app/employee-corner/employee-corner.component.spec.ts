import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCornerComponent } from './employee-corner.component';

describe('EmployeeCornerComponent', () => {
  let component: EmployeeCornerComponent;
  let fixture: ComponentFixture<EmployeeCornerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeCornerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCornerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAssignRoleComponent } from './admin-assign-role.component';

describe('AdminAssignRoleComponent', () => {
  let component: AdminAssignRoleComponent;
  let fixture: ComponentFixture<AdminAssignRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAssignRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAssignRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

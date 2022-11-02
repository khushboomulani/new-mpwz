import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptAdminComponent } from './dept-admin.component';

describe('DeptAdminComponent', () => {
  let component: DeptAdminComponent;
  let fixture: ComponentFixture<DeptAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeptAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

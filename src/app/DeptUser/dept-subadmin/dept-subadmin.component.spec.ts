import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptSubadminComponent } from './dept-subadmin.component';

describe('DeptSubadminComponent', () => {
  let component: DeptSubadminComponent;
  let fixture: ComponentFixture<DeptSubadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeptSubadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptSubadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

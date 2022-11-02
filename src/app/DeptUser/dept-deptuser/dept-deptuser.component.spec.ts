import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptDeptuserComponent } from './dept-deptuser.component';

describe('DeptDeptuserComponent', () => {
  let component: DeptDeptuserComponent;
  let fixture: ComponentFixture<DeptDeptuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeptDeptuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptDeptuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

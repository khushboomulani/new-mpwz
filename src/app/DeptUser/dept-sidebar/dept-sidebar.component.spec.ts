import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptSidebarComponent } from './dept-sidebar.component';

describe('DeptSidebarComponent', () => {
  let component: DeptSidebarComponent;
  let fixture: ComponentFixture<DeptSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeptSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

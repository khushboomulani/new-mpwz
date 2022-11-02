import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptHeaderComponent } from './dept-header.component';

describe('DeptHeaderComponent', () => {
  let component: DeptHeaderComponent;
  let fixture: ComponentFixture<DeptHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeptHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptHomeComponent } from './dept-home.component';

describe('DeptHomeComponent', () => {
  let component: DeptHomeComponent;
  let fixture: ComponentFixture<DeptHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeptHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

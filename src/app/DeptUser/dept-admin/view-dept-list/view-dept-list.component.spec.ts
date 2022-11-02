import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDeptListComponent } from './view-dept-list.component';

describe('ViewDeptListComponent', () => {
  let component: ViewDeptListComponent;
  let fixture: ComponentFixture<ViewDeptListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDeptListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDeptListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

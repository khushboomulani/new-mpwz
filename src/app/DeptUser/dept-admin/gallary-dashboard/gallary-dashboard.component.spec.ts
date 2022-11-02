import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GallaryDashboardComponent } from './gallary-dashboard.component';

describe('GallaryDashboardComponent', () => {
  let component: GallaryDashboardComponent;
  let fixture: ComponentFixture<GallaryDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GallaryDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GallaryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

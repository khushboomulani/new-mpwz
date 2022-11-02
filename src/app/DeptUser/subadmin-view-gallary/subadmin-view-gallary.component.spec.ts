import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminViewGallaryComponent } from './subadmin-view-gallary.component';

describe('SubadminViewGallaryComponent', () => {
  let component: SubadminViewGallaryComponent;
  let fixture: ComponentFixture<SubadminViewGallaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubadminViewGallaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubadminViewGallaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

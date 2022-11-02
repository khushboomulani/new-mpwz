import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateGallaryComponent } from './admin-create-gallary.component';

describe('AdminCreateGallaryComponent', () => {
  let component: AdminCreateGallaryComponent;
  let fixture: ComponentFixture<AdminCreateGallaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCreateGallaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateGallaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

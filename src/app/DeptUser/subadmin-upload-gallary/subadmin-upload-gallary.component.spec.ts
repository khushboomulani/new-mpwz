import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminUploadGallaryComponent } from './subadmin-upload-gallary.component';

describe('SubadminUploadGallaryComponent', () => {
  let component: SubadminUploadGallaryComponent;
  let fixture: ComponentFixture<SubadminUploadGallaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubadminUploadGallaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubadminUploadGallaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

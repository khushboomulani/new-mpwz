import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminUploadCircularComponent } from './subadmin-upload-circular.component';

describe('SubadminUploadCircularComponent', () => {
  let component: SubadminUploadCircularComponent;
  let fixture: ComponentFixture<SubadminUploadCircularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubadminUploadCircularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubadminUploadCircularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

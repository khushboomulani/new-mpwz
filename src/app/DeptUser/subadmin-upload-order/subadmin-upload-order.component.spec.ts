import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminUploadOrderComponent } from './subadmin-upload-order.component';

describe('SubadminUploadOrderComponent', () => {
  let component: SubadminUploadOrderComponent;
  let fixture: ComponentFixture<SubadminUploadOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubadminUploadOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubadminUploadOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

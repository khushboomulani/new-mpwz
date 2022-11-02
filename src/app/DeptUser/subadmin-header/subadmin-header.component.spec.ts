import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminHeaderComponent } from './subadmin-header.component';

describe('SubadminHeaderComponent', () => {
  let component: SubadminHeaderComponent;
  let fixture: ComponentFixture<SubadminHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubadminHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubadminHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

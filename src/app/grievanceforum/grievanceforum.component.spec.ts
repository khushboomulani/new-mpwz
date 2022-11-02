import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrievanceforumComponent } from './grievanceforum.component';

describe('GrievanceforumComponent', () => {
  let component: GrievanceforumComponent;
  let fixture: ComponentFixture<GrievanceforumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrievanceforumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrievanceforumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestAnnoucementComponent } from './latest-annoucement.component';

describe('LatestAnnoucementComponent', () => {
  let component: LatestAnnoucementComponent;
  let fixture: ComponentFixture<LatestAnnoucementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestAnnoucementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestAnnoucementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

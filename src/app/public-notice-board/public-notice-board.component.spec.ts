import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicNoticeBoardComponent } from './public-notice-board.component';

describe('PublicNoticeBoardComponent', () => {
  let component: PublicNoticeBoardComponent;
  let fixture: ComponentFixture<PublicNoticeBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicNoticeBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicNoticeBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

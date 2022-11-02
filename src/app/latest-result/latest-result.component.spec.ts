import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestResultComponent } from './latest-result.component';

describe('LatestResultComponent', () => {
  let component: LatestResultComponent;
  let fixture: ComponentFixture<LatestResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

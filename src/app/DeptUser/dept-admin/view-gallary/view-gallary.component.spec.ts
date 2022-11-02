import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGallaryComponent } from './view-gallary.component';

describe('ViewGallaryComponent', () => {
  let component: ViewGallaryComponent;
  let fixture: ComponentFixture<ViewGallaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGallaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGallaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRemoveDocComponent } from './view-remove-doc.component';

describe('ViewRemoveDocComponent', () => {
  let component: ViewRemoveDocComponent;
  let fixture: ComponentFixture<ViewRemoveDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRemoveDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRemoveDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

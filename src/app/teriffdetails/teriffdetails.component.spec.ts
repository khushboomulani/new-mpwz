import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeriffdetailsComponent } from './teriffdetails.component';

describe('TeriffdetailsComponent', () => {
  let component: TeriffdetailsComponent;
  let fixture: ComponentFixture<TeriffdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeriffdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeriffdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergysavingComponent } from './energysaving.component';

describe('EnergysavingComponent', () => {
  let component: EnergysavingComponent;
  let fixture: ComponentFixture<EnergysavingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnergysavingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergysavingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

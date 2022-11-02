import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EodbComponent } from './eodb.component';

describe('EodbComponent', () => {
  let component: EodbComponent;
  let fixture: ComponentFixture<EodbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EodbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EodbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

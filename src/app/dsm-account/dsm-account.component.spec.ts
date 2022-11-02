import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsmAccountComponent } from './dsm-account.component';

describe('DsmAccountComponent', () => {
  let component: DsmAccountComponent;
  let fixture: ComponentFixture<DsmAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsmAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsmAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

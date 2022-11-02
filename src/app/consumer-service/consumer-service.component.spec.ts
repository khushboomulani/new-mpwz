import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerServiceComponent } from './consumer-service.component';

describe('ConsumerServiceComponent', () => {
  let component: ConsumerServiceComponent;
  let fixture: ComponentFixture<ConsumerServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPdsfComponent } from './test-pdsf.component';

describe('TestPdsfComponent', () => {
  let component: TestPdsfComponent;
  let fixture: ComponentFixture<TestPdsfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestPdsfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPdsfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

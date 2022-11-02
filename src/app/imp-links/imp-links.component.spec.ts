import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpLinksComponent } from './imp-links.component';

describe('ImpLinksComponent', () => {
  let component: ImpLinksComponent;
  let fixture: ComponentFixture<ImpLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

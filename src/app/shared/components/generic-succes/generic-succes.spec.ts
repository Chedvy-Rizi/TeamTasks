import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericSucces } from './generic-succes';

describe('GenericSucces', () => {
  let component: GenericSucces;
  let fixture: ComponentFixture<GenericSucces>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericSucces]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericSucces);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

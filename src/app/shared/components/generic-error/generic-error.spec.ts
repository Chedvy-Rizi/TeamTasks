import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericError } from './generic-error';

describe('GenericError', () => {
  let component: GenericError;
  let fixture: ComponentFixture<GenericError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericError]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericError);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

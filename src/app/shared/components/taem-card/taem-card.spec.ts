import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaemCard } from './taem-card';

describe('TaemCard', () => {
  let component: TaemCard;
  let fixture: ComponentFixture<TaemCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaemCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaemCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

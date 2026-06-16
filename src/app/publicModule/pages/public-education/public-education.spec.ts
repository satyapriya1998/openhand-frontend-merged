import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicEducation } from './public-education';

describe('PublicEducation', () => {
  let component: PublicEducation;
  let fixture: ComponentFixture<PublicEducation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicEducation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicEducation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

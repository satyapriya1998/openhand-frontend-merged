import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicReviewAndSubmit } from './public-review-and-submit';

describe('PublicReviewAndSubmit', () => {
  let component: PublicReviewAndSubmit;
  let fixture: ComponentFixture<PublicReviewAndSubmit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicReviewAndSubmit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicReviewAndSubmit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

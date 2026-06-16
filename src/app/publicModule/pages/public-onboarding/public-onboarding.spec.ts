import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicOnboarding } from './public-onboarding';

describe('PublicOnboarding', () => {
  let component: PublicOnboarding;
  let fixture: ComponentFixture<PublicOnboarding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicOnboarding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicOnboarding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

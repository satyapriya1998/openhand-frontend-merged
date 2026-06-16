import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingDetail } from './onboarding-detail';

describe('OnboardingDetail', () => {
  let component: OnboardingDetail;
  let fixture: ComponentFixture<OnboardingDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

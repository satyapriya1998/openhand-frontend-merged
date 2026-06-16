import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingList } from './onboarding-list';

describe('OnboardingList', () => {
  let component: OnboardingList;
  let fixture: ComponentFixture<OnboardingList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

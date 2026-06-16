import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicExperience } from './public-experience';

describe('PublicExperience', () => {
  let component: PublicExperience;
  let fixture: ComponentFixture<PublicExperience>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicExperience]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicExperience);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

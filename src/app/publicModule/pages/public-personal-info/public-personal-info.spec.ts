import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPersonalInfo } from './public-personal-info';

describe('PublicPersonalInfo', () => {
  let component: PublicPersonalInfo;
  let fixture: ComponentFixture<PublicPersonalInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicPersonalInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicPersonalInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

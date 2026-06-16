import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicAddress } from './public-address';

describe('PublicAddress', () => {
  let component: PublicAddress;
  let fixture: ComponentFixture<PublicAddress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicAddress]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicAddress);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

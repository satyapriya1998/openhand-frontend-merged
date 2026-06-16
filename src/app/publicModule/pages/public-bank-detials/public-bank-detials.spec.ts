import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicBankDetials } from './public-bank-detials';

describe('PublicBankDetials', () => {
  let component: PublicBankDetials;
  let fixture: ComponentFixture<PublicBankDetials>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicBankDetials]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicBankDetials);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

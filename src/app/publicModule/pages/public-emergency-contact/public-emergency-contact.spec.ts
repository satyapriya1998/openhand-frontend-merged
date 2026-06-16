import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicEmergencyContact } from './public-emergency-contact';

describe('PublicEmergencyContact', () => {
  let component: PublicEmergencyContact;
  let fixture: ComponentFixture<PublicEmergencyContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicEmergencyContact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicEmergencyContact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicWelcome } from './public-welcome';

describe('PublicWelcome', () => {
  let component: PublicWelcome;
  let fixture: ComponentFixture<PublicWelcome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicWelcome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicWelcome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

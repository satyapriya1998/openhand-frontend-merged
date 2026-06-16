import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicDocuments } from './public-documents';

describe('PublicDocuments', () => {
  let component: PublicDocuments;
  let fixture: ComponentFixture<PublicDocuments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicDocuments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicDocuments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSubHeader } from './page-sub-header';

describe('PageSubHeader', () => {
  let component: PageSubHeader;
  let fixture: ComponentFixture<PageSubHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageSubHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSubHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

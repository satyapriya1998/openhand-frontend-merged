import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavesMain } from './leaves-main';

describe('LeavesMain', () => {
  let component: LeavesMain;
  let fixture: ComponentFixture<LeavesMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeavesMain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeavesMain);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMineComponent } from './show-mine.component';

describe('ShowMineComponent', () => {
  let component: ShowMineComponent;
  let fixture: ComponentFixture<ShowMineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowMineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowMineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

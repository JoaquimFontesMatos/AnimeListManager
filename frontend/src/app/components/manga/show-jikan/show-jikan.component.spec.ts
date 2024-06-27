import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowJikanComponent } from './show-jikan.component';

describe('ShowJikanComponent', () => {
  let component: ShowJikanComponent;
  let fixture: ComponentFixture<ShowJikanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowJikanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowJikanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

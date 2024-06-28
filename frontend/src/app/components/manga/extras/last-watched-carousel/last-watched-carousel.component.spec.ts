import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastWatchedCarouselComponent } from './last-watched-carousel.component';

describe('LastWatchedCarouselComponent', () => {
  let component: LastWatchedCarouselComponent;
  let fixture: ComponentFixture<LastWatchedCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastWatchedCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LastWatchedCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

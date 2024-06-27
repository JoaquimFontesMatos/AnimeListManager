import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalScrollGalleryComponent } from './horizontal-scroll-gallery.component';

describe('HorizontalScrollGalleryComponent', () => {
  let component: HorizontalScrollGalleryComponent;
  let fixture: ComponentFixture<HorizontalScrollGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalScrollGalleryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HorizontalScrollGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

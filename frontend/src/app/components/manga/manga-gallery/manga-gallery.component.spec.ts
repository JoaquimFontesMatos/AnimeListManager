import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaGalleryComponent } from './manga-gallery.component';

describe('MangaGalleryComponent', () => {
  let component: MangaGalleryComponent;
  let fixture: ComponentFixture<MangaGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangaGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

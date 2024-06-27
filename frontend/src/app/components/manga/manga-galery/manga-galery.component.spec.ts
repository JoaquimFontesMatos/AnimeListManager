import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaGaleryComponent } from './manga-galery.component';

describe('MangaGaleryComponent', () => {
  let component: MangaGaleryComponent;
  let fixture: ComponentFixture<MangaGaleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaGaleryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MangaGaleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

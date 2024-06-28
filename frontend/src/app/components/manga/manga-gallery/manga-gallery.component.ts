import { Component, OnInit } from '@angular/core';
import { UserManga } from '../../../models/Manga';
import { DetailsComponent } from '../details/details.component';
import { MatDialog } from '@angular/material/dialog';
import { FilterService } from '../../../services/filter.service';
import { MangaStateService } from '../../../services/mangas/manga-state.service';
import { CommonModule } from '@angular/common';
import { HorizontalScrollGalleryComponent } from '../extras/horizontal-scroll-gallery/horizontal-scroll-gallery.component';
import { LastWatchedCarouselComponent } from '../extras/last-watched-carousel/last-watched-carousel.component';

@Component({
  selector: 'app-manga-gallery',
  standalone: true,
  imports: [
    CommonModule,
    HorizontalScrollGalleryComponent,
    LastWatchedCarouselComponent,
  ],
  templateUrl: './manga-gallery.component.html',
  styleUrl: './manga-gallery.component.css',
})
export class MangaGalleryComponent implements OnInit {
  _allMangas: UserManga[] = [];
  mangasUser: UserManga[] = [];

  constructor(
    private mangaStateService: MangaStateService,
    private filterService: FilterService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.mangaStateService.mangas$.subscribe((mangas) => {
      this._allMangas = mangas;
      this.mangasUser = this._allMangas;
    });
  }

  openDialog(userManga: UserManga, index: number) {
    this.dialog.open(DetailsComponent, {
      data: { userManga, index },
    });
  }

  async filter(status: String): Promise<void> {
    this.mangasUser = this.filterService.filterMangasStatus(
      this._allMangas,
      status
    );
  }
}

import { Component, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { UserManga } from '../../../../models/Manga';
import { FilterService } from '../../../../services/filter.service';
import { CommonModule } from '@angular/common';
import { MangaStateService } from '../../../../services/mangas/manga-state.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from '../../details/details.component';

@Component({
  selector: 'app-last-watched-carousel',
  standalone: true,
  imports: [NgbCarouselModule, CommonModule],
  templateUrl: './last-watched-carousel.component.html',
  styleUrl: './last-watched-carousel.component.css',
})
export class LastWatchedCarouselComponent {
  displayedMangas: UserManga[] = [];

  paused = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', { static: true })
  carousel: NgbCarousel = new NgbCarousel();

  constructor(
    private filterService: FilterService,
    private mangaStateService: MangaStateService,
    private dialog: MatDialog
  ) {
    this.mangaStateService.mangas$.subscribe((mangas) => {
      this.displayedMangas = this.filterService.filterLast3Mangas(mangas);
    });
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  trackByFn(index: number, userManga: UserManga): string | undefined {
    return userManga.manga.image?.largeImage;
  }

  openDialog(userManga: UserManga, index: number) {
    this.dialog.open(DetailsComponent, {
      data: { userManga, index },
    });
  }
}

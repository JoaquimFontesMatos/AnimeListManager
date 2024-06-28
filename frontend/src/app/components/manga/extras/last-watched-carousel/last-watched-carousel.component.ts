import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgbCarousel, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { UserManga } from '../../../../models/Manga';
import { FilterService } from '../../../../services/filter.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-last-watched-carousel',
  standalone: true,
  imports: [NgbCarouselModule, CommonModule],
  templateUrl: './last-watched-carousel.component.html',
  styleUrl: './last-watched-carousel.component.css',
})
export class LastWatchedCarouselComponent implements OnChanges {
  @Input() userMangas: UserManga[] | undefined;
  displayedMangas: UserManga[] = [];

  paused = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', { static: true })
  carousel: NgbCarousel = new NgbCarousel();

  constructor(private filterService: FilterService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userMangas'] && this.userMangas) {
      this.filter();
    }
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  filter() {
    if (this.userMangas) {
      this.displayedMangas = this.filterService.filterLast3Mangas(
        this.userMangas
      );
    }
  }

  trackByFn(index: number, userManga: UserManga): string | undefined {
    return userManga.manga.image?.largeImage;
  }
}

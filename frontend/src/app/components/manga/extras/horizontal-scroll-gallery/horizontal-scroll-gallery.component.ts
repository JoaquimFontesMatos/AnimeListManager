import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserManga } from '../../../../models/Manga';
import { FilterService } from '../../../../services/filter.service';
import { MangaStateService } from '../../../../services/mangas/manga-state.service';
import { DetailsComponent } from '../../details/details.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-horizontal-scroll-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horizontal-scroll-gallery.component.html',
  styleUrl: './horizontal-scroll-gallery.component.css',
})
export class HorizontalScrollGalleryComponent implements OnInit {
  @Input() watchStatus: string = '';
  mangasUser: UserManga[] = [];

  private _allMangas: UserManga[] = [];

  constructor(
    private mangaStateService: MangaStateService,
    private filterService: FilterService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.mangaStateService.mangas$.subscribe((mangas) => {
      this._allMangas = mangas;
      this.mangasUser = this._allMangas;

      this.filter(this.watchStatus);
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

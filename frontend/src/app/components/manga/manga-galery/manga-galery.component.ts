import { Component, OnInit } from '@angular/core';
import { UserManga } from '../../../models/Manga';
import { DetailsComponent } from '../details/details.component';
import { MatDialog } from '@angular/material/dialog';
import { FilterService } from '../../../services/filter.service';
import { MangaStateService } from '../../../services/mangas/manga-state.service';
import { CommonModule } from '@angular/common';
import { HorizontalScrollGaleryComponent } from '../extras/horizontal-scroll-galery/horizontal-scroll-galery.component';

@Component({
  selector: 'app-manga-galery',
  standalone: true,
  imports: [CommonModule, HorizontalScrollGaleryComponent],
  templateUrl: './manga-galery.component.html',
  styleUrl: './manga-galery.component.css',
})
export class MangaGaleryComponent implements OnInit {
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

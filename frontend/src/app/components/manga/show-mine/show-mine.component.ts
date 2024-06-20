import { Component, OnInit } from '@angular/core';
import { MangaServiceService } from '../../../services/manga-service.service';
import { Manga, UserManga } from '../../../models/Manga';
import { CommonModule } from '@angular/common';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { startWith } from 'rxjs';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-show-mine',
  standalone: true,
  templateUrl: './show-mine.component.html',
  styleUrl: './show-mine.component.css',
  imports: [CommonModule, NgbPagination, FormsModule],
})
export class ShowMineComponent implements OnInit {
  mangasUser?: UserManga[];
  private _allMangas: UserManga[] = [];
  page: number = 1;
  pageSize: number = 10;
  collectionSize: any;

  constructor(private mangaService: MangaServiceService) {}

  ngOnInit(): void {
    this.mangaService
      .getMangaAddedObservable()
      .pipe(startWith(null))
      .subscribe(() => {
        this.loadMangas();
      });
  }

  trackByTitle(index: number, mangaUser: UserManga): any {
    return mangaUser.manga.title;
  }

  filter(): void {
    this.mangaService
      .getMangas(this.page, this.pageSize)
      .subscribe((data: UserManga[]) => {
        this.mangasUser = data;
      });
  }

  loadMangas(): void {
    this.mangaService.getMangas(1, 100000).subscribe((data: UserManga[]) => {
      this.mangasUser = data;
      this.collectionSize = data.length;
      this._allMangas = this.mangasUser;
      this.collectionSize = this._allMangas.length;
    });
    this.filter();
  }
}

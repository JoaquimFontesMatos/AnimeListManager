import { Component } from '@angular/core';
import { Manga, UserManga } from '../../../models/Manga';
import { JikanMangaService } from '../../../services/jikan/jikan-manga.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { AddMangaComponent } from '../add-manga/add-manga.component';

@Component({
  selector: 'app-show-jikan',
  standalone: true,
  templateUrl: './show-jikan.component.html',
  styleUrl: './show-jikan.component.css',
  imports: [CommonModule, NgbPagination, FormsModule, AddMangaComponent],
})
export class ShowJikanComponent {
  mangas: Manga[] = [];
  mangaTitle?: string;
  page = 1;
  pageSize = 4;
  collectionSize: number = 0;
  sfw: boolean = true;

  private _allMangas: Manga[] = [];

  constructor(private jikanManga: JikanMangaService) {}

  hide(): void {
    this.mangaTitle = undefined;
  }

  search(): void {
    this.jikanManga
      .getMangas(this.mangaTitle || '', this.sfw)
      .subscribe((data) => {
        console.log(data);

        this.processMangas(data);
      });
  }

  private processMangas(data: any): void {
    this.mangas = this.jikanManga.processMangas(data);
    this.collectionSize = this.mangas.length;
    this._allMangas = this.mangas;
    this.refreshMangas();
  }

  refreshMangas(): void {
    this.mangas = this._allMangas
      .map((manga: Manga, i: number) => ({
        id: i + 1,
        ...manga,
      }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
}

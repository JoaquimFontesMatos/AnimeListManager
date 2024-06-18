import { Component } from '@angular/core';
import { Manga } from '../../../models/Manga';
import { JikanMangaService } from '../../../services/jikan/jikan-manga.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { AddMangaComponent } from '../add-manga/add-manga.component';
import { timeout } from 'rxjs';

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

  search(): void {
    this.jikanManga
      .getMangas(this.mangaTitle || '', this.sfw)
      .subscribe((data) => {
        console.log(data);

        this.processMangas(data);
      });
  }

  private processMangas(data: any): void {
    for (let index = 0; index < data.data.length; index++) {
      this.mangas[index] = new Manga();
      this.mangas[index].title = data.data[index].title;
      this.mangas[index].totalChapters = data.data[index].chapters;
      this.mangas[index].mangaStatus = data.data[index].status;
      this.mangas[index].image = data.data[index].images.jpg.image_url;
      this.mangas[index].mal_id = data.data[index].mal_id;
      this.mangas[index].score = data.data[index].score;
      this.mangas[index].synopsis = data.data[index].synopsis;
      this.mangas[index].type = data.data[index].type;
      this.mangas[index].published = data.data[index].published;

      let themes: string[] = [];
      for (let i = 0; i < data.data[index].themes.length; i++) {
        themes[i] = data.data[index].themes[i].name;
      }
      this.mangas[index].themes = themes;

      let genres: string[] = [];
      for (let i = 0; i < data.data[index].genres.length; i++) {
        genres[i] = data.data[index].genres[i].name;
      }
      this.mangas[index].genres = genres;
    }
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

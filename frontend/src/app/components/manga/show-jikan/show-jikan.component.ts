import { Component, OnInit } from '@angular/core';
import { Manga } from '../../../models/Manga';
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
export class ShowJikanComponent implements OnInit {
  mangas: Manga[];
  private _allMangas: Manga[] = [];
  page = 1;
  pageSize = 4;
  collectionSize: number = 0;

  constructor(private jikanManga: JikanMangaService) {
    this.mangas = [];
  }

  ngOnInit(): void {
    this.jikanManga.getMangas('naruto').subscribe((data) => {
      for (let index = 0; index < data.data.length; index++) {
        this.mangas[index] = new Manga();
        this.mangas[index].title = data.data[index].title;
        this.mangas[index].chapter = data.data[index].chapters;
        this.mangas[index].status = data.data[index].status;
        this.mangas[index].image = data.data[index].images.jpg.image_url;

        var genres: string[] = [];
        for (let i = 0; i < data.data[index].genres.length; i++) {
          genres[i] = data.data[index].genres[i].name;
        }
        this.mangas[index].genres = genres;
      }
      this.collectionSize = this.mangas.length;
      this._allMangas = this.mangas;

      this.refreshMangas() 
    });
  }

  refreshMangas() {
    this.mangas = this._allMangas
      .map((manga: any, i: number) => ({
        id: i + 1,
        ...manga,
      }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
}

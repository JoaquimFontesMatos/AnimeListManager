import { Component, Inject } from '@angular/core';
import { Manga } from '../../../models/Manga';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AddMangaComponent } from "../add-manga/add-manga.component";

@Component({
    selector: 'app-details-jikan',
    standalone: true,
    templateUrl: './details-jikan.component.html',
    styleUrl: './details-jikan.component.css',
    imports: [
        CommonModule,
        MatChipsModule,
        MatDialogContent,
        MatDialogModule,
        MatDialogTitle,
        AddMangaComponent
    ]
})
export class DetailsJikanComponent {
  manga: Manga = new Manga();
  genres: string[] = []; // Replace with userManga.manga.genres
  genreColors: { [key: string]: string } = {};
  colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF'];
  themes: string[] = []; // Replace with userManga.manga.genres
  themeColors: { [key: string]: string } = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.manga = data;

    if (this.manga.genres) {
      this.genres = this.manga.genres;
    }
    if (this.manga.themes) {
      this.themes = this.manga.themes;
    }
    this.assignRandomColors();
  }

  assignRandomColors() {
    this.genres.forEach((genre: string) => {
      this.genreColors[genre] =
        this.colors[Math.floor(Math.random() * this.colors.length)];
    });
    this.themes.forEach((theme: string) => {
      this.themeColors[theme] =
        this.colors[Math.floor(Math.random() * this.colors.length)];
    });
  }

  add() {}
}

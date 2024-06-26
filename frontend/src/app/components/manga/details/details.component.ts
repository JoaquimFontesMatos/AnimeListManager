import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { UserManga } from '../../../models/Manga';
import { CommonModule } from '@angular/common';
import { MangaStateService } from '../../../services/mangas/manga-state.service';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatChipsModule,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  userManga: UserManga;
  index: number;
  genres: string[] = []; // Replace with userManga.manga.genres
  genreColors: { [key: string]: string } = {};
  colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF'];
  themes: string[] = []; // Replace with userManga.manga.genres
  themeColors: { [key: string]: string } = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mangaStateService: MangaStateService
  ) {
    this.userManga = data.userManga;
    this.index = data.index;
    if (this.userManga.manga.genres) {
      this.genres = this.userManga.manga.genres;
    }
    if (this.userManga.manga.themes) {
      this.themes = this.userManga.manga.themes;
    }
    this.assignRandomColors();
  }

  delete() {
    this.mangaStateService.deleteManga(this.index);
  }

  update() {
    this.mangaStateService.updateManga(this.userManga, this.index);
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
}

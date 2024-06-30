import { Component } from '@angular/core';
import { JikanMangaService } from '../../../../services/jikan/jikan-manga.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DetailsJikanComponent } from '../../details-jikan/details-jikan.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top.component.html',
  styleUrl: './top.component.css',
})
export class TopComponent {
  mangas: any;

  constructor(
    private jikanManga: JikanMangaService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.jikanManga.getTop().subscribe((mangas: any) => {
      this.mangas = mangas.data.slice(0, 5);
    });
  }

  openDialog(manga: any) {
    manga = this.jikanManga.processManga(manga);

    this.dialog.open(DetailsJikanComponent, {
      data: manga,
    });
  }
}

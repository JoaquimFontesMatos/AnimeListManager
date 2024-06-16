import { Component, OnInit } from '@angular/core';
import { MangaServiceService } from '../../../services/manga-service.service';
import { Manga } from '../../../models/Manga';
import { CommonModule } from '@angular/common';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-show-mine',
  standalone: true,
  templateUrl: './show-mine.component.html',
  styleUrl: './show-mine.component.css',
  imports: [CommonModule, NgbPagination, FormsModule],
})
export class ShowMineComponent implements OnInit {
  mangas?: Manga[];
  private _allMangas: Manga[] = [];
  page = 1;
  pageSize = 10;
  collectionSize: any;

  constructor(private mangaService: MangaServiceService) {}

  ngOnInit(): void {
    this.loadMangas();

    this.mangaService.getMangaAddedObservable().subscribe((newManga: Manga) => {
      this.loadMangas();
    });
  }

  filter(): void {
    this.mangaService
      .getMangas(this.page, this.pageSize)
      .subscribe((data: Manga[]) => {
        this.mangas = data;
      });
  }

  loadMangas(): void {
    this.mangaService.getMangas(1, 100000).subscribe((data: Manga[]) => {
      this.mangas = data;
      this.collectionSize = data.length;
      this._allMangas = this.mangas;
      this.collectionSize = this.mangas.length;
    });
    this.filter();
  }
}

import { Component, OnInit } from '@angular/core';
import { MangaServiceService } from '../../../services/manga-service.service';
import { UserManga } from '../../../models/Manga';
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
  mangasUser?: UserManga[];
  private _allMangas: UserManga[] = [];
  page: number = 1;
  pageSize: number = 10;
  collectionSize: number = 0;

  constructor(private mangaService: MangaServiceService) {}

  ngOnInit(): void {
    this.mangaService.getMangaAddedObservable().subscribe(() => {
      this.reloadMangas();
    });

    this.reloadMangas();
  }

  trackByMalId(index: number, mangaUser: UserManga): any {
    return mangaUser.favoriteManga.mal_id;
  }

  reloadMangas(): void {
    setTimeout(() => {
      this.mangaService.getMangas(1, 100000).subscribe((data: UserManga[]) => {
        this._allMangas = data;
        this.collectionSize = data.length;
        this.filter();
      });
    }, 1000); // Adjust the delay time as needed
  }

  filter(): void {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.mangasUser = this._allMangas.slice(startIndex, endIndex);
  }
}

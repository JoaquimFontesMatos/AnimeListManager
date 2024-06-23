import { Component, OnInit } from '@angular/core';
import { MangaServiceService } from '../../../services/manga-service.service';
import { UserManga } from '../../../models/Manga';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterService } from '../../../services/filter.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-show-mine',
  standalone: true,
  templateUrl: './show-mine.component.html',
  styleUrls: ['./show-mine.component.css'],
  imports: [CommonModule, MatPaginatorModule, FormsModule],
})
export class ShowMineComponent implements OnInit {
  mangasUser?: UserManga[];
  page: number = 1;
  pageSize: number = 10;
  collectionSize: number = 0;

  private _allMangas: UserManga[] = [];
  private initialLoad = true;

  constructor(
    private mangaService: MangaServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private filterService: FilterService
  ) {}

  pageChanged(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.filter();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const newPage = params['page'] ? parseInt(params['page']) : 1;
      const newPageSize = params['pageSize']
        ? parseInt(params['pageSize'])
        : 10;

      if (this.page !== newPage || this.pageSize !== newPageSize) {
        this.page = newPage;
        this.pageSize = newPageSize;

        if (this.initialLoad) {
          this.initialLoad = false;
        } else {
          this.reloadMangas();
        }
      }
    });

    // Initial manga load
    this.mangaService.getMangaAddedObservable().subscribe(async () => {
      await this.reloadMangas();
    });
  }

  trackByMalId(index: number, mangaUser: UserManga): any {
    return mangaUser.favoriteManga.mal_id;
  }

  async reloadMangas(): Promise<void> {
    console.log('Reloading mangas...');
    this.mangaService.getMangas().subscribe(async (data: UserManga[]) => {
      this._allMangas = data;
      this.collectionSize = data.length;
      console.log('Mangas loaded, collection size:', this.collectionSize);

      await this.filter();
    });
  }

  async filter(): Promise<void> {
    this.mangasUser = this.filterService.filterMangas(
      this._allMangas,
      this.page,
      this.pageSize
    );

    const queryParams = {
      page: this.page.toString(),
      pageSize: this.pageSize.toString(),
    };

    this.router.navigate([], {
      queryParams: queryParams,
      replaceUrl: true,
    });
  }
}

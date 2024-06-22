import { Component, OnInit } from '@angular/core';
import { MangaServiceService } from '../../../services/manga-service.service';
import { UserManga } from '../../../models/Manga';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterService } from '../../../services/filter.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { take } from 'rxjs';

@Component({
  selector: 'app-show-mine',
  standalone: true,
  templateUrl: './show-mine.component.html',
  styleUrls: ['./show-mine.component.css'],
  imports: [CommonModule, MatPaginatorModule, FormsModule],
})
export class ShowMineComponent implements OnInit {
  mangasUser?: UserManga[];
  private _allMangas: UserManga[] = [];
  page: number = 1;
  pageSize: number = 10;
  collectionSize: number = 0;
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
      console.log('QueryParams:', params);
      const newPage = params['page'] ? parseInt(params['page']) : 1;
      const newPageSize = params['pageSize']
        ? parseInt(params['pageSize'])
        : 10;

      if (this.page !== newPage || this.pageSize !== newPageSize) {
        this.page = newPage;
        this.pageSize = newPageSize;
        console.log('Updated page and pageSize:', this.page, this.pageSize);

        if (this.initialLoad) {
          this.initialLoad = false;
        } else {
          this.reloadMangas();
        }
      }
    });

    console.log('Updated page and pageSize2:', this.page, this.pageSize);

    // Initial manga load
    console.log('Updated page and pageSize3:', this.page, this.pageSize);

    this.mangaService.getMangaAddedObservable().subscribe(() => {
      this.reloadMangas();
      console.log('Updated page and pageSize5:', this.page, this.pageSize);
    });
  }

  trackByMalId(index: number, mangaUser: UserManga): any {
    return mangaUser.favoriteManga.mal_id;
  }

  reloadMangas(): void {
    console.log('Updated page and pageSize4:', this.page, this.pageSize);

    console.log('Reloading mangas...');
    this.mangaService.getMangas().subscribe(async (data: UserManga[]) => {
      this._allMangas = data;
      this.collectionSize = data.length;
      console.log('Mangas loaded, collection size:', this.collectionSize);
      console.log('Updated page and pageSize6:', this.page, this.pageSize);

      await this.filter();
    });
  }

  async filter(): Promise<void> {
    console.log('Updated page and pageSize7:', this.page, this.pageSize);

    this.mangasUser = this.filterService.filterMangas(
      this._allMangas,
      this.page,
      this.pageSize
    );
    console.log('Filtered mangas:', this.mangasUser);

    const queryParams = {
      page: this.page.toString(),
      pageSize: this.pageSize.toString(),
    };

    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      const currentQueryParams = {
        page: params['page'] ? params['page'].toString() : '1',
        pageSize: params['pageSize'] ? params['pageSize'].toString() : '10',
      };

      if (
        currentQueryParams.page !== queryParams.page ||
        currentQueryParams.pageSize !== queryParams.pageSize
      ) {
        this.router.navigate([], {
          queryParams: queryParams,
          replaceUrl: true,
        });
      }
    });
  }
}

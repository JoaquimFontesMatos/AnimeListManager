import { Component, OnInit } from '@angular/core';
import { UserManga } from '../../../models/Manga';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterService } from '../../../services/filter.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MangaStateService } from '../../../services/mangas/manga-state.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-show-mine',
  standalone: true,
  templateUrl: './show-mine.component.html',
  styleUrls: ['./show-mine.component.css'],
  imports: [CommonModule, MatPaginatorModule, FormsModule, MatButtonModule],
})
export class ShowMineComponent implements OnInit {
  page: number = 1;
  collectionSize: number = 0;
  pageSize: number = 10;
  initialLoad: boolean = true;

  _allMangas: UserManga[] = [];
  mangasUser: UserManga[] = [];

  constructor(
    private mangaStateService: MangaStateService,
    private filterService: FilterService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
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
      }

      this.mangaStateService.mangas$.subscribe((mangas) => {
        this._allMangas = mangas;
        this.collectionSize = mangas.length;
        this.filter();
      });
    });
  }

  openDialog(userManga: UserManga, index: number) {
    this.dialog.open(DetailsComponent, {
      data: { userManga, index },
    });
  }

  trackByMalId(index: number, mangaUser: UserManga): any {
    return mangaUser.favoriteManga.mal_id;
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

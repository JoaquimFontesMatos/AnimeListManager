import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgbDropdownModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  animes: any[] = [];
  totalEp: Number = 0;
  presentation: String = 'table';

  constructor(
    public apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  searchForm = new FormGroup({
    name: new FormControl(''),
  });

  ngOnInit() {
    this.getAnimes();
    this.subscribeToAnimeCreatedEvent();
  }

  countEp() {
    this.totalEp = 0;
    for (let index = 0; index < this.animes.length; index++) {
      this.totalEp += this.animes[index].episode;
    }
  }

  getAnimes() {
    return new Promise<void>((resolve, reject) => {
      this.apiService.getAnimes().subscribe(
        (data: any) => {
          console.log(data);
          this.animes = data.sort((a: any, b: any) =>
            a.name.localeCompare(b.name)
          );
          this.countEp();
          resolve();
        },
        (error) => {
          console.error(error);
          reject(error);
        }
      );
    });
  }

  galeryView() {
    this.presentation = 'galery';
  }

  tableView() {
    this.presentation = 'table';
  }

  onAnimeCreated() {
    this.getAnimes();
  }

  getColor(status: String) {
    switch (status) {
      case 'To Watch':
        return 'blue';
      case 'Watching':
        return 'green';
      case 'Seen':
        return 'gray';
      case 'Dropped':
        return 'red';
      default:
        return 'black';
    }
  }

  async getByStatus(status: String) {
    await this.getAnimes();
    if (status !== 'All') {
      var newList = [];
      var count: number = 0;

      for (let index = 0; index < this.animes.length; index++) {
        const anime = this.animes[index];

        if (anime.status === status) {
          newList[count++] = anime;
        }
      }

      this.animes = newList;
      this.countEp();
    }
  }

  async search() {
    await this.getAnimes();
    var newList = [];
    var count: number = 0;

    if (this.searchForm.value.name) {
      for (let index = 0; index < this.animes.length; index++) {
        const anime = this.animes[index];

        if (
          anime.name
            .toUpperCase()
            .includes(this.searchForm.value.name.toUpperCase())
        ) {
          newList[count++] = anime;
        }
      }
      this.animes = newList;
      this.countEp();
    }
  }

  // In your AppComponent
  subscribeToAnimeCreatedEvent() {
    this.apiService.animeUpdated.subscribe({
      next: () => {
        this.getAnimes();
      },
      error: (error: any) => {
        console.error('Error updating the anime list:', error);
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  animes: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.getAnimes();
    this.subscribeToAnimeCreatedEvent();
  }

  getAnimes() {
    this.apiService.getAnimes().subscribe((data: any) => {
      console.log(data);
      this.animes = data;
    });
  }

  onAnimeCreated() {
    this.getAnimes();
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

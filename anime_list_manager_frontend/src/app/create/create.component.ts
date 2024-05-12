import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  animeForm = new FormGroup({
    name: new FormControl(''),
    status: new FormControl(''),
    episode: new FormControl(''),
  });

  constructor(private apiService: ApiService, private router: Router) {}

  saveAnime() {
    console.log(this.animeForm.value);
    this.apiService.createAnime(this.animeForm.value).subscribe(() => {});
    console.log('Anime Created');

    this.router.navigate(['/']);
  }
}

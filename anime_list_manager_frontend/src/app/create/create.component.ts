import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgbTooltipModule,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  animeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    episode: new FormControl('', Validators.required),
    image: new FormControl('', [
      Validators.required,
      Validators.pattern('https?://.+'),
    ]),
  });

  constructor(protected apiService: ApiService, private router: Router) {}

  saveAnime() {
    console.log(this.animeForm.value);
    this.apiService.createAnime(this.animeForm.value).subscribe(() => {});
    console.log('Anime Created');

    this.router.navigate(['/']);
  }
}

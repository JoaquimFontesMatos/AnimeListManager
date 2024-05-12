import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {
  Params,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgbTooltipModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  animeId: any;
  anime: any;

  animeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    episode: new FormControl('', Validators.required),
    image: new FormControl('', [
      Validators.required,
      Validators.pattern('https?://.+'),
    ]),
  });

  constructor(
    protected apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.animeId = this.route.snapshot.paramMap.get('id');

    this.anime = this.apiService.getAnime(this.animeId).subscribe({
      next: (data) => {
        this.anime = data;
        this.animeForm.patchValue({
          name: this.anime.name,
          status: this.anime.status,
          episode: this.anime.episode,
          image: this.anime.image,
        });
      },
      error: (err) => {
        console.error('Error fetching anime:', err);
      },
    });
  }

  updateAnime() {
    console.log(this.animeForm.value);
    this.apiService
      .updateAnime(this.animeId, this.animeForm.value)
      .subscribe(() => {});
    console.log('Anime Updated');

    this.router.navigate(['/']);
  }
}

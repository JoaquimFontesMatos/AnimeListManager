import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {
  Params,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css',
})
export class DeleteComponent implements OnInit {
  animeId: any;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.animeId = this.route.snapshot.paramMap.get('id');
    
    this.apiService.deleteAnime(this.animeId).subscribe(() => {});
    console.log('Anime Deleted');

    this.router.navigate(['/']);
  }
}

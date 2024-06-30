import { Component } from '@angular/core';
import { JikanMangaService } from '../../../../services/jikan/jikan-manga.service';

@Component({
  selector: 'app-recomendations',
  standalone: true,
  imports: [],
  templateUrl: './recomendations.component.html',
  styleUrl: './recomendations.component.css',
})
export class RecomendationsComponent {
  mangas: any;

  constructor(private jikanManga: JikanMangaService) {}

  ngOnInit(): void {
    this.jikanManga.getTop().subscribe((mangas: any) => {
      this.mangas = mangas;
      console.log(mangas);
    });
  }
}

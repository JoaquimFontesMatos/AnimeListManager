import { Component, OnInit } from '@angular/core';
import { JikanMangaService } from '../../../services/jikan/jikan-manga.service';

@Component({
  selector: 'app-list-mangas',
  standalone: true,
  imports: [],
  templateUrl: './list-mangas.component.html',
  styleUrl: './list-mangas.component.css',
})
export class ListMangasComponent implements OnInit {
  constructor(private jikanManga: JikanMangaService) {}

  mangas: any;

  ngOnInit(): void {
    this.jikanManga.getMangas('one piece').subscribe((data) => {
      this.mangas = data.data;
      console.log(this.mangas);
    });
  }
}

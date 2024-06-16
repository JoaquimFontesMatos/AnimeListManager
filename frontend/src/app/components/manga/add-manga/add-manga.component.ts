import { Component, Input } from '@angular/core';
import { Manga } from '../../../models/Manga';
import { MangaServiceService } from '../../../services/manga-service.service';

@Component({
  selector: 'app-add-manga',
  standalone: true,
  imports: [],
  templateUrl: './add-manga.component.html',
  styleUrl: './add-manga.component.css',
})
export class AddMangaComponent {
  @Input() manga: Manga;

  constructor(private mangaService: MangaServiceService) {
    this.manga = new Manga();
  }

  save() {
    this.mangaService.saveManga(this.manga).subscribe((data: Manga) => {
      console.log(data);
    });
  }
}

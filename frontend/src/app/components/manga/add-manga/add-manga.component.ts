import { Component, Input, TemplateRef, inject } from '@angular/core';
import { Manga } from '../../../models/Manga';
import { MangaServiceService } from '../../../services/manga-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User, FavouritedManga } from '../../../models/User';

@Component({
  selector: 'app-add-manga',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-manga.component.html',
  styleUrl: './add-manga.component.css',
})
export class AddMangaComponent {
  @Input() manga: Manga;

  favouritedManga: FavouritedManga;

  closeResult = '';
  user: User;

  constructor(private mangaService: MangaServiceService) {
    this.manga = new Manga();
    this.user = new User();
    this.favouritedManga = new FavouritedManga();
  }
  private modalService = inject(NgbModal);

  save() {
    this.mangaService.saveManga(this.manga).subscribe((data: Manga) => {
      console.log(data);

      this.favouritedManga.id = { $oid: data._id };
      var manga = this.favouritedManga;
      if (manga && this.user.favouriteManga) {
        this.user.favouriteManga.push(manga);
        console.log(manga);
        console.log(this.user);
      }
    });
  }

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      });
  }
}

import { Component, Input, TemplateRef, inject } from '@angular/core';
import { Manga } from '../../../models/Manga';
import { MangaServiceService } from '../../../services/manga-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-manga',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-manga.component.html',
  styleUrl: './add-manga.component.css',
})
export class AddMangaComponent {
  @Input() manga: Manga;

  closeResult = '';

  private modalService = inject(NgbModal);

  constructor(private mangaService: MangaServiceService) {
    this.manga = new Manga();
  }

  save() {
    this.mangaService.saveManga(this.manga).subscribe((data: Manga) => {
      console.log(data);
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

import { Component, Input, TemplateRef, inject } from '@angular/core';
import { Manga, UserManga } from '../../../models/Manga';
import { MangaServiceService } from '../../../services/mangas/manga-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User, FavoritedManga } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { firstValueFrom } from 'rxjs';
import { MangaStateService } from '../../../services/mangas/manga-state.service';

@Component({
  selector: 'app-add-manga',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-manga.component.html',
  styleUrl: './add-manga.component.css',
})
export class AddMangaComponent {
  @Input() manga: Manga;

  favoritedManga: FavoritedManga;

  closeResult = '';

  constructor(
    private mangaService: MangaServiceService,
    private userService: UserService,
    private mangaStateService: MangaStateService
  ) {
    this.manga = new Manga();
    this.favoritedManga = new FavoritedManga();
  }
  private modalService = inject(NgbModal);

  save(): void {
    this.userService.getUser().subscribe(async (user: User) => {
      try {
        // Save manga in the database, and get the mal_id
        let mal_id = await this.saveManga();

        if (mal_id) {
          if (user.favoriteManga.some((manga) => manga.mal_id === mal_id)) {
            console.log('Already added!');
            return;
          }
          // Update the favoriteManga object
          this.favoritedManga.mal_id = mal_id;

          await firstValueFrom(
            this.mangaService.addFavoriteManga(this.favoritedManga)
          );
          let userManga = new UserManga(this.manga, this.favoritedManga);

          this.mangaStateService.addManga(userManga);
        }
      } catch (err) {
        console.error('Error saving manga or updating user:', err);
      }
    });
  }

  async saveManga(): Promise<number | undefined> {
    try {
      if (!this.manga.malId) {
        return undefined;
      }

      // Check if manga with malId is already saved
      const isSaved = await firstValueFrom(
        this.mangaService.isMangaMalIdSaved(this.manga.malId)
      );

      if (isSaved) {
        console.log('Manga with malId already saved:', this.manga.malId);
        return this.manga.malId; // Return malId if already saved
      }

      // If manga is not saved, proceed to save it
      const savedManga = await firstValueFrom(
        this.mangaService.saveManga(this.manga)
      );

      if (savedManga) {
        console.log('Manga saved successfully:', savedManga);
        return savedManga.malId; // Return malId of saved manga
      } else {
        return undefined;
      }
    } catch (err) {
      console.error('Error saving manga:', err);
      return undefined;
    }
  }

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      });
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserManga } from '../../models/Manga';
import { MangaServiceService } from './manga-service.service';

@Injectable({
  providedIn: 'root',
})
export class MangaStateService {
  private mangasSubject = new BehaviorSubject<UserManga[]>([]);
  mangas$ = this.mangasSubject.asObservable();

  constructor(private mangaService: MangaServiceService) {}

  loadMangas(): void {
    let savedMangas = localStorage.getItem('userMangas');

    if (savedMangas) {
      this.mangasSubject.next(JSON.parse(savedMangas));

      this.mangaService.getMangas().subscribe((databaseMangas: UserManga[]) => {
        if (databaseMangas != JSON.parse(savedMangas)) {
          console.log('LOADED FROM DATABASE');

          this.mangasSubject.next(databaseMangas);
        }
      });
    }
  }

  addManga(manga: UserManga) {
    const currentMangas = this.mangasSubject.getValue();
    this.mangasSubject.next([...currentMangas, manga]);
    //this.syncWithBackend();
    localStorage.setItem(
      'userMangas',
      JSON.stringify(this.mangasSubject.getValue())
    );
  }

  private async syncWithBackend() {
    const currentMangas = this.mangasSubject.getValue();
    // Send the current state to the backend
    await this.mangaService.syncMangas(currentMangas).toPromise();
  }
}

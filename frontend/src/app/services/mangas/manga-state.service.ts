import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, firstValueFrom, interval, Subscription } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { UserManga } from '../../models/Manga';
import { MangaServiceService } from './manga-service.service';
import { UserService } from '../user.service';
import { FavoritedManga, User } from '../../models/User';

@Injectable({
  providedIn: 'root',
})
export class MangaStateService implements OnDestroy {
  private mangasSubject = new BehaviorSubject<UserManga[]>([]);
  mangas$ = this.mangasSubject.asObservable();

  private _lastUpdate: Date = new Date();
  private _mangas: UserManga[] = [];
  private _user: User = new User();
  private _syncSubscription: Subscription = new Subscription();
  private isSynced: boolean = true;
  private static SYNC_TIME = 5 * 60 * 1000;

  constructor(
    private mangaService: MangaServiceService,
    private userService: UserService
  ) {
    this.loadFromLocalStorage();
    this.instantiateUser().then(() => {
      this.loadMangasFromDatabase();
    });
    this.startPeriodicSync();
  }

  private loadFromLocalStorage() {
    const savedMangas = localStorage.getItem('userMangas');
    const lastUpdate = localStorage.getItem('lastUpdateMangas');

    if (savedMangas) {
      this._mangas = JSON.parse(savedMangas);
    }

    if (lastUpdate) {
      this._lastUpdate = new Date(JSON.parse(lastUpdate));
    }
  }

  private async instantiateUser(): Promise<void> {
    try {
      this._user = await firstValueFrom(this.userService.getUser());
      this.parseDate();
    } catch (error) {
      console.error('Failed to instantiate user:', error);
    }
  }

  private loadMangasFromDatabase() {
    this.mangaService
      .getMangas()
      .pipe(
        catchError((error) => {
          console.error('Failed to load mangas from database:', error);
          return []; // Return an empty array or handle appropriately
        })
      )
      .subscribe((databaseMangas: UserManga[]) => {
        if (this._user.updatedAt && this._user.updatedAt >= this._lastUpdate) {
          console.log('LOADED FROM DATABASE');
          this._lastUpdate = this._user.updatedAt;
          this._mangas = databaseMangas;
        }

        this.mangasSubject.next(this._mangas);
      });
  }

  private parseDate() {
    if (typeof this._user.updatedAt === 'string') {
      this._user.updatedAt = new Date(this._user.updatedAt);
    }
    if (typeof this._lastUpdate === 'string') {
      this._lastUpdate = new Date(this._lastUpdate);
    }
  }

  addManga(manga: UserManga) {
    manga.favoriteManga.dateAdded = new Date();
    this._mangas.push(manga);
    this.handleMangaUpdate();
  }

  updateManga(manga: UserManga, index: number) {
    manga.favoriteManga.dateEdited = new Date();
    this._mangas[index] = manga;
    this.handleMangaUpdate();
  }

  deleteManga(index: number) {
    this._mangas.splice(index, 1);
    this.handleMangaUpdate();
  }

  private handleMangaUpdate() {
    this.updateLocalStorage();
    this.mangasSubject.next(this._mangas);
    this.isSynced = false;
  }

  private updateLocalStorage() {
    localStorage.setItem('userMangas', JSON.stringify(this._mangas));
    this._lastUpdate = new Date();
    localStorage.setItem('lastUpdateMangas', JSON.stringify(this._lastUpdate));
  }

  private async syncWithBackend() {
    if (!this._user) {
      console.error('SYNC ERROR: No user found');
      return;
    }

    if (this.isSynced) {
      console.log('SYNC SKIPPED');
      return;
    }

    const favoritedMangas: FavoritedManga[] = this._mangas.map(
      (m) => m.favoriteManga
    );
    this._user.favoriteManga = favoritedMangas;

    try {
      await firstValueFrom(this.userService.updateUser(this._user));
      console.log('SYNCHRONIZED WITH DATABASE');
      this.isSynced = true;
    } catch (error) {
      console.error('SYNC ERROR: Failed to update user on the backend', error);
    }
  }

  private startPeriodicSync() {
    this._syncSubscription = interval(MangaStateService.SYNC_TIME)
      .pipe(
        switchMap(() => this.syncWithBackend()),
        catchError((error) => {
          console.error('Periodic sync failed:', error);
          return []; // Handle the error appropriately
        })
      )
      .subscribe(() => {
        console.log('Periodic sync completed');
      });
  }

  ngOnDestroy() {
    if (this._syncSubscription) {
      this._syncSubscription.unsubscribe();
    }
  }
}

import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  firstValueFrom,
  interval,
  switchMap,
  timeout,
} from 'rxjs';
import { Manga, UserManga } from '../../models/Manga';
import { MangaServiceService } from './manga-service.service';
import { UserService } from '../user.service';
import { FavoritedManga } from '../../models/User';

@Injectable({
  providedIn: 'root',
})
export class MangaStateService {
  private mangasSubject = new BehaviorSubject<UserManga[]>([]);
  mangas$ = this.mangasSubject.asObservable();

  private _lastUpdate: Date = new Date();
  private _lastSync: Date = new Date();
  private _mangas: UserManga[] = [];

  constructor(
    private mangaService: MangaServiceService,
    private userService: UserService
  ) {
    let savedMangas = localStorage.getItem('userMangas');
    let lastUpdate = localStorage.getItem('lastUpdateMangas');
    let lastSync = localStorage.getItem('lastSyncMangas');

    if (savedMangas) {
      this._mangas = JSON.parse(savedMangas);
    }

    if (lastUpdate) {
      this._lastUpdate = JSON.parse(lastUpdate);
    }

    if (lastSync) {
      this._lastSync = JSON.parse(lastSync);
    }

    console.log(
      'last update:' + this._lastUpdate + 'last sync:' + this._lastSync
    );

    this.mangaService.getMangas().subscribe((databaseMangas: UserManga[]) => {
      if (this._lastSync >= this._lastUpdate) {
        console.log('LOADED FROM DATABASE');
        this._lastUpdate = this._lastSync;
        this._mangas = databaseMangas;
      }

      this.mangasSubject.next(this._mangas);
    });

    this.startPeriodicSync();
  }

  addManga(manga: UserManga) {
    this._mangas.push(manga);
    localStorage.setItem('userMangas', JSON.stringify(this._mangas));

    this._lastUpdate = new Date();
    localStorage.setItem('lastUpdateManga', JSON.stringify(this._lastUpdate));

    this.mangasSubject.next(this._mangas);
  }

  updateManga(manga: UserManga, index: number) {
    this._mangas[index] = manga;
    localStorage.setItem('userMangas', JSON.stringify(this._mangas));

    this._lastUpdate = new Date();
    localStorage.setItem('lastUpdateManga', JSON.stringify(this._lastUpdate));

    this.mangasSubject.next(this._mangas);
  }

  deleteManga(index: number) {
    this._mangas.splice(index, 1);
    localStorage.setItem('userMangas', JSON.stringify(this._mangas));

    this._lastUpdate = new Date();
    localStorage.setItem('lastUpdateMangas', JSON.stringify(this._lastUpdate));

    this.mangasSubject.next(this._mangas);

    console.log(
      'last update:' + this._lastUpdate + 'last sync:' + this._lastSync
    );
  }

  private async syncWithBackend() {
    const currentMangas = this._mangas;

    let favoritedMangas: FavoritedManga[] = [];

    for (let index = 0; index < currentMangas.length; index++) {
      favoritedMangas[index] = currentMangas[index].favoriteManga;
    }

    let user = await firstValueFrom(this.userService.getUser());

    if (!user) {
      console.log('SYNC ERROR: No user found');
      return; // Exit the function if no user is found
    }

    user.favoriteManga = favoritedMangas;
    if (!user.favoriteManga) {
      console.log('SYNC ERROR: favoriteManga not set');
      return; // Exit the function if favoriteManga is not set
    }

    try {
      // Send the current state to the backend
      const savedUser = await firstValueFrom(this.userService.updateUser(user));

      console.log('SYNCHRONIZED WITH DATABASE');
    } catch (error) {
      console.log('SYNC ERROR: Failed to update user on the backend', error);
    }
  }

  private startPeriodicSync() {
    interval(60000) // Sync every 60 seconds
      .pipe(
        switchMap(() => {
          return this.syncWithBackend();
        })
      )
      .subscribe(() => {
        console.log('Periodic sync completed');
      });
  }
}

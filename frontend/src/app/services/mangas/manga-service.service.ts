import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Observable,
  BehaviorSubject,
  tap,
  filter,
  catchError,
  throwError,
} from 'rxjs';
import { Manga, UserManga } from '../../models/Manga';
import { environment } from '../../../environments/environment';
import { FavoritedManga, User } from '../../models/User';

const endpoint = environment.backendUrl + 'm/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class MangaServiceService {
  private addMangaSubject = new BehaviorSubject<FavoritedManga>(
    new FavoritedManga()
  );

  constructor(private http: HttpClient) {}

  getMangas(): Observable<UserManga[]> {
    return this.http.get<UserManga[]>(endpoint + 'mangas');
  }

  isMangaMalIdSaved(id: number): Observable<boolean> {
    return this.http.get<boolean>(endpoint + 'manga-mal-id/' + id);
  }

  saveManga(manga: Manga): Observable<Manga> {
    return this.http.post<Manga>(
      endpoint + 'mangas',
      JSON.stringify(manga),
      httpOptions
    );
  }

  addFavoriteManga(manga: FavoritedManga): Observable<User> {
    return this.http
      .put<User>(endpoint + 'add-favorite-manga', manga, httpOptions)
      .pipe(
        tap(() => {
          this.addMangaSubject.next(manga);
        }),
        catchError((error) => {
          console.error('Error adding favorite manga:', error);
          return throwError(error);
        })
      );
  }

  getMangaAddedObservable(): Observable<FavoritedManga> {
    return this.addMangaSubject
      .asObservable()
      .pipe(filter((manga) => manga !== null));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Manga, UserManga } from '../models/Manga';
import { environment } from '../../environments/environment';

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
  private addMangaSubject = new Subject<Manga>();

  constructor(private http: HttpClient) {}

  getMangas(page: number, pageSize: number): Observable<UserManga[]> {
    return this.http.get<UserManga[]>(
      endpoint + 'mangas' + '?page=' + page + '&limit=' + pageSize
    );
  }

  isMangaMalIdSaved(id: number): Observable<boolean> {
    return this.http.get<boolean>(endpoint + 'manga-mal-id/' + id);
  }

  saveManga(manga: Manga): Observable<Manga> {
    return this.http
      .post<Manga>(endpoint + 'mangas', JSON.stringify(manga), httpOptions)
      .pipe(tap((newManga: Manga) => this.addMangaSubject.next(newManga)));
  }

  getMangaAddedObservable(): Observable<Manga> {
    return this.addMangaSubject.asObservable();
  }
}

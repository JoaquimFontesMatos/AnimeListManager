import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Manga } from '../models/Manga';

const endpoint = 'http://localhost:3000/api/v1/m/';
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

  getMangas(page: number, pageSize: number): Observable<Manga[]> {
    return this.http.get<Manga[]>(
      endpoint + 'mangas' + '?page=' + page + '&limit=' + pageSize
    );
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

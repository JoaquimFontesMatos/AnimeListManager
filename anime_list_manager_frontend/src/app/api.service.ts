import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private BASE_URL = 'http://localhost:3000/api/v1'; // replace with your API base URL
  animeUpdated = new EventEmitter<any>();

  constructor(private http: HttpClient) {}

  getAnimes(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/animes`);
  }

  createAnime(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/animes`, data).pipe(
      tap(() => {
        // Emit the event after the anime is successfully created
        this.animeUpdated.emit();
      })
    );
  }

  getAnime(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/anime/${id}`);
  }

  updateAnime(id: string, data: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/anime/${id}`, data).pipe(
      tap(() => {
        // Emit the event after the anime is successfully created
        this.animeUpdated.emit();
      })
    );
  }

  deleteAnime(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/anime/${id}`).pipe(
      tap(() => {
        // Emit the event after the anime is successfully created
        this.animeUpdated.emit();
      })
    );
  }

  // implement other methods as needed
}

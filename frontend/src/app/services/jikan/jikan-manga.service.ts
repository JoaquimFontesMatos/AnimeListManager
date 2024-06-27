import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JikanMangaService {
  private BASE_URL = 'https://api.jikan.moe/v4/manga';

  constructor(private http: HttpClient) {}

  getMangas(query: string, sfw: boolean): Observable<any> {
    const headers = new HttpHeaders({ 'X-Skip-Interceptor': 'true' });
    return this.http.get(
      this.BASE_URL + '?q=' + query + '&sort=asc&sfw=' + sfw,
      { headers }
    );
  }
}

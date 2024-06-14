import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JikanApiService {
  private BASE_URL = 'https://api.jikan.moe/v4/manga'; // replace with your API base URL

  constructor(private http: HttpClient) {}

  getMangas(query: String): Observable<any> {
    return this.http.get(
      this.BASE_URL + '?q=' + query + '&order_by=title&sort=asc'
    );
  }
}


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manga } from '../../models/Manga';

@Injectable({
  providedIn: 'root',
})
export class JikanMangaService {
  private BASE_URL = 'https://api.jikan.moe/v4/';

  constructor(private http: HttpClient) {}

  getMangas(query: string, sfw: boolean): Observable<any> {
    const headers = new HttpHeaders({ 'X-Skip-Interceptor': 'true' });
    return this.http.get(
      this.BASE_URL + 'manga?q=' + query + '&sort=asc&sfw=' + sfw,
      { headers }
    );
  }

  getRecommendations(): Observable<any> {
    const headers = new HttpHeaders({ 'X-Skip-Interceptor': 'true' });
    return this.http.get(this.BASE_URL + 'recommendations/manga', { headers });
  }

  getTop(): Observable<any> {
    const headers = new HttpHeaders({ 'X-Skip-Interceptor': 'true' });
    return this.http.get(this.BASE_URL + 'top/manga', { headers });
  }

  processMangas(data: any): Manga[] {
    let mangas: Manga[] = [];

    for (let index = 0; index < data.data.length; index++) {
      mangas[index] = this.processManga(data.data[index]);
    }
    return mangas;
  }

  processManga(mangaUnprocessed: any): Manga {
    let manga: Manga;

    //assign general attributes
    manga = new Manga();
    manga.title = mangaUnprocessed.title;
    manga.totalChapters = mangaUnprocessed.chapters;
    manga.mangaStatus = mangaUnprocessed.status;
    manga.malId = mangaUnprocessed.mal_id;
    manga.score = mangaUnprocessed.score;
    manga.synopsis = mangaUnprocessed.synopsis;
    manga.type = mangaUnprocessed.type;
    manga.published = mangaUnprocessed.published.string;

    //assign images
    let images = {
      smallImage: mangaUnprocessed.images.webp.small_image_url,
      mediumImage: mangaUnprocessed.images.webp.image_url,
      largeImage: mangaUnprocessed.images.webp.large_image_url,
    };
    manga.image = images;

    //assign themes
    let themes: string[] = [];
    for (let i = 0; i < mangaUnprocessed.themes.length; i++) {
      themes[i] = mangaUnprocessed.themes[i].name;
    }
    manga.themes = themes;

    //assign genres
    let genres: string[] = [];
    for (let i = 0; i < mangaUnprocessed.genres.length; i++) {
      genres[i] = mangaUnprocessed.genres[i].name;
    }
    manga.genres = genres;

    return manga;
  }
}

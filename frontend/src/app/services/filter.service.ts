import { Injectable } from '@angular/core';
import { UserManga } from '../models/Manga';

@Injectable({
  providedIn: 'root',
})
@Injectable({
  providedIn: 'root',
})
export class FilterService {
  filterMangas(
    allMangas: UserManga[],
    page: number,
    pageSize: number
  ): UserManga[] {
    if (page < 1 || pageSize < 1) {
      throw new Error("Invalid pagination parameters");
    }
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return allMangas.slice(startIndex, endIndex);
  }
}

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
    console.log('Filter params: page:' + page + ', pageSize:' + pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return allMangas.slice(startIndex, endIndex);
  }
}

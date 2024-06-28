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
      throw new Error('Invalid pagination parameters');
    }
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return allMangas.slice(startIndex, endIndex);
  }

  filterMangasStatus(allMangas: UserManga[], status: String): UserManga[] {
    return allMangas.filter(
      (manga) => manga.favoriteManga.watchStatus === status
    );
  }

  filterLast3Mangas(allMangas: UserManga[]): UserManga[] {
    return allMangas
      .filter((manga) => manga.favoriteManga.dateEdited !== null)
      .sort((a, b) => {
        // Compare the dateEdited properties
        const dateA = a.favoriteManga.dateEdited
          ? new Date(a.favoriteManga.dateEdited).getTime()
          : 0;
        const dateB = b.favoriteManga.dateEdited
          ? new Date(b.favoriteManga.dateEdited).getTime()
          : 0;

        return dateB - dateA; // Descending order
      })
      .slice(0, 3); // Get the first 3 elements
  }
}

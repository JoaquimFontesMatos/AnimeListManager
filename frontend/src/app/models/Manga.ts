import { FavoritedManga } from './User';

export class Manga {
  constructor(
    public _id?: string,
    public mal_id?: number,
    public mangaStatus?: string,
    public score?: number,
    public synopsis?: string,
    public myStatus: string = 'To Watch',
    public totalChapters?: number,
    public title?: string,
    public genres?: string[],
    public image?: string,
    public themes?: string[],
    public published?: {
      from: Date;
      prop: {
        from: { day: number; month: number; year: number };
        to: { day: number; month: number; year: number };
      };
      string: string;
      to: Date;
    },
    public type?: string,
    public dateEdited?: Date,
    public dateAdded?: Date
  ) {}
}

export class UserManga {
  constructor(public manga: Manga, public favoriteManga: FavoritedManga) {}
}

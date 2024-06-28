import { FavoritedManga } from './User';

export class Manga {
  constructor(
    public _id?: string,
    public malId?: number,
    public mangaStatus?: string,
    public score?: number,
    public synopsis?: string,
    public myStatus: string = 'To Watch',
    public totalChapters?: number,
    public title?: string,
    public genres?: string[],
    public image?: {
      smallImage?: string;
      mediumImage?: string;
      largeImage?: string;
    },
    public themes?: string[],
    public published?: string,
    public type?: string
  ) {}
}

export class UserManga {
  constructor(public manga: Manga, public favoriteManga: FavoritedManga) {}
}

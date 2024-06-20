export class FavoritedManga {
  constructor(
    public mal_id?: number,
    public watchStatus: string = 'To Watch',
    public currentChapter: number = 0
  ) {}
}

export class User {
  constructor(
    public username?: string,
    public email?: string,
    public password?: string,
    public favoriteManga: FavoritedManga[] = [],
    public updatedAt?: Date,
    public createdAt?: Date
  ) {}
}

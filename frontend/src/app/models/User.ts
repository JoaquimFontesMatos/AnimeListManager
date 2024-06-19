export class FavouritedManga {
  constructor(
    public id?: { $oid?: string },
    public watchStatus: string = 'To Watch',
    public currentChapter: number = 0
  ) {}
}

export class User {
  constructor(
    public username?: string,
    public email?: string,
    public password?: string,
    public favouriteManga?: FavouritedManga[],
    public updatedAt?: Date,
    public createdAt?: Date
  ) {
    this.favouriteManga = new Array<FavouritedManga>();
  }
}

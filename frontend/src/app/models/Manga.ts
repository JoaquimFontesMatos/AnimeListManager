export class Manga {
  constructor(
    public mal_id?: string,
    public mangaStatus?: string,
    public score?: number,
    public synopsis?: string,
    public myStatus: string = 'To Watch',
    public totalChapters?: number,
    public currentChapter: number = 0,
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
    dateEdited?: Date,
    dateAdded?: Date
  ) {}
}

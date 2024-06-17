export class Manga {
  constructor(
    public mangaStatus?: string,
    public myStatus: string = 'To Watch',
    public totalChapters?: number,
    public currentChapter: number = 0,
    public title?: string,
    public genres?: string[],
    public image?: string
  ) {}
}

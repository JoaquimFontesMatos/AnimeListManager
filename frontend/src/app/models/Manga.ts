export class Manga {
  constructor(
    public status?: string,
    public chapter?: number,
    public title?: string,
    public genres?: string[],
    public image?: string
  ) {}
}

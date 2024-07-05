export class Language {
  protected id: string | null = null;
  protected title: string | null = null;

  constructor(id: string | null, title: string | null) {
    this.id = id;
    this.title = title;
  }

  public getId(): string | null {
    return this.id;
  }

  public setId(id: string | null) {
    this.id = id;
  }

  public getTitle(): string | null {
    return this.title;
  }

  public setTitle(title: string | null) {
    this.title = title;
  }
}

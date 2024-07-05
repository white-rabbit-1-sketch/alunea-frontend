export class Mailbox {
  protected id: string | null = null;
  protected email: string | null = null;
  protected isEmailVerified: boolean = false;
  protected isFavorite: boolean = false;
  protected isEnabled: boolean = false;
  protected aliasesCount: number = 0;

  public getId(): string | null {
    return this.id;
  }

  public setId(id: string | null): void {
    this.id = id;
  }

  public getEmail(): string | null {
    return this.email;
  }

  public setEmail(email: string | null): void {
    this.email = email;
  }

  public getIsEmailVerified(): boolean {
    return this.isEmailVerified;
  }

  public setIsEmailVerified(isEmailVerified: boolean) {
    this.isEmailVerified = isEmailVerified;
  }

  public getIsFavorite(): boolean {
    return this.isFavorite;
  }

  public setIsFavorite(isFavorite: boolean): void {
    this.isFavorite = isFavorite;
  }

  public getIsEnabled(): boolean {
    return this.isEnabled;
  }

  public setIsEnabled(isEnabled: boolean): void {
    this.isEnabled = isEnabled;
  }

  public getAliasesCount(): number {
    return this.aliasesCount;
  }

  public setAliasesCount(aliasesCount: number): void {
    this.aliasesCount = aliasesCount;
  }
}

import { JsonObject, JsonProperty } from 'typescript-json-serializer';

@JsonObject()
export class MailboxDto {
  @JsonProperty()
  protected id: string | null = null;
  @JsonProperty()
  protected email: string | null = null;
  @JsonProperty()
  protected isEmailVerified: boolean = false;
  @JsonProperty()
  protected isFavorite: boolean = false;
  @JsonProperty()
  protected isEnabled: boolean = false;
  @JsonProperty()
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

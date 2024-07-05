import { JsonObject, JsonProperty } from 'typescript-json-serializer';

@JsonObject()
export class ContactDto {
  @JsonProperty()
  protected id: string | null = null;
  @JsonProperty()
  protected email: string | null = null;
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

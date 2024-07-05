import { JsonObject, JsonProperty } from 'typescript-json-serializer';

@JsonObject()
export abstract class AbstractDomainDto {
  @JsonProperty()
  protected id: string | null = null;
  @JsonProperty()
  protected type: string | null = null;
  @JsonProperty()
  protected domain: string | null = null;
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

  public getType(): string | null {
    return this.type;
  }

  public setType(type: string | null): void {
    this.type = type;
  }

  public getDomain(): string | null {
    return this.domain;
  }

  public setDomain(domain: string | null) {
    this.domain = domain;
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

export abstract class AbstractDomain {
  protected id: string | null = null;
  protected domain: string | null = null;
  protected isEnabled: boolean = false;
  protected aliasesCount: number = 0;

  public getId(): string | null {
    return this.id;
  }

  public setId(id: string | null) {
    this.id = id;
  }

  public getDomain(): string | null {
    return this.domain;
  }

  public setDomain(email: string | null) {
    this.domain = email;
  }

  public getIsEnabled(): boolean | null {
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

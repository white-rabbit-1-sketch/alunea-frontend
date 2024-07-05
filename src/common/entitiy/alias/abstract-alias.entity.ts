import {AbstractDomain} from "../domain/abstract-domain.entity";

export abstract class AbstractAlias {
  protected id: string | null = null;
  protected type: string | null = null;
  protected domain: AbstractDomain | null = null;
  protected recipient: string | null = null;
  protected isEnabled: boolean = false;

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

  public getDomain(): AbstractDomain | null {
    return this.domain;
  }

  public setDomain(domain: AbstractDomain | null): void {
    this.domain = domain;
  }

  public getRecipient(): string | null {
    return this.recipient;
  }

  public setRecipient(recipient: string | null): void {
    this.recipient = recipient;
  }

  public getIsEnabled(): boolean {
    return this.isEnabled;
  }

  public setIsEnabled(isEnabled: boolean): void {
    this.isEnabled = isEnabled;
  }
}

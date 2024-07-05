import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import {AbstractDomainDto} from "../../domain/entity/abstract-domain.dto";
import {DomainChoice} from "../../domain/domain-choice.const";

@JsonObject()
export abstract class AbstractAliasDto {
  @JsonProperty()
  protected id: string | null = null;
  @JsonProperty()
  protected type: string | null = null;
  @JsonProperty({type: DomainChoice})
  protected domain: AbstractDomainDto | null = null;
  @JsonProperty()
  protected recipient: string | null = null;
  @JsonProperty()
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

  public getDomain(): AbstractDomainDto | null {
    return this.domain;
  }

  public setDomain(domain: AbstractDomainDto | null): void {
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

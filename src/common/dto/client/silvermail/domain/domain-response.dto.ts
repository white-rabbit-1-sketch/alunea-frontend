import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import {BaseResponseDto} from "../base-response.dto";
import {AbstractDomainDto} from "./entity/abstract-domain.dto";
import {DomainChoice} from "./domain-choice.const";

@JsonObject()
export class DomainResponseDto extends BaseResponseDto {
  @JsonProperty({type: DomainChoice})
  protected domain: AbstractDomainDto | null = null;

  public getDomain(): AbstractDomainDto | null {
    return this.domain;
  }

  public setDomain(domain: AbstractDomainDto | null): void {
    this.domain = domain;
  }
}

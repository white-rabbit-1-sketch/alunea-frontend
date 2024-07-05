import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import {BaseResponseDto} from "../base-response.dto";
import {DomainChoice} from "./domain-choice.const";
import {AbstractDomainDto} from "./entity/abstract-domain.dto";

@JsonObject()
export class DomainListResponseDto extends BaseResponseDto {
  @JsonProperty({type: DomainChoice})
  protected domainList: AbstractDomainDto[] = [];

  public getDomainList(): AbstractDomainDto[] {
    return this.domainList;
  }

  public setDomainList(domainList: AbstractDomainDto[]): void {
    this.domainList = domainList;
  }
}

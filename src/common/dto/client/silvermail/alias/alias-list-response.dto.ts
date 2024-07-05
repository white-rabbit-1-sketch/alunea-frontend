import {BaseResponseDto} from "../base-response.dto";
import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import {AbstractAliasDto} from "./entity/abstract-alias.dto";
import {AliasChoice} from "./alias-choice.const";

@JsonObject()
export class AliasListResponseDto extends BaseResponseDto {
  @JsonProperty({type: AliasChoice})
  protected aliasList: AbstractAliasDto[] = [];

  public getAliasList(): AbstractAliasDto[] {
    return this.aliasList;
  }

  public setAliasList(aliasList: AbstractAliasDto[]): void {
    this.aliasList = aliasList;
  }
}

import {BaseResponseDto} from "../base-response.dto";
import {AbstractAliasDto} from "./entity/abstract-alias.dto";
import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import {AliasChoice} from "./alias-choice.const";

@JsonObject()
export class AliasResponseDto extends BaseResponseDto {
  @JsonProperty({type: AliasChoice})
  protected alias: AbstractAliasDto | null = null;

  public getAlias(): AbstractAliasDto | null {
    return this.alias;
  }

  public setAlias(alias: AbstractAliasDto | null): void {
    this.alias = alias;
  }
}

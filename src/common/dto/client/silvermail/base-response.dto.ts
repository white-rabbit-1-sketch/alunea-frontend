import { JsonObject, JsonProperty } from 'typescript-json-serializer';

@JsonObject()
export abstract class BaseResponseDto {
  @JsonProperty()
  protected result: boolean = false;

  public getResult(): boolean
  {
    return this.result;
  }

  public setResult(result: boolean)
  {
    this.result = result;
  }
}

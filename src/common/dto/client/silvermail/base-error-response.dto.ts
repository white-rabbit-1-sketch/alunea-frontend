import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import {BaseResponseDto} from "./base-response.dto";

@JsonObject()
export class BaseErrorResponseDto extends BaseResponseDto{
  @JsonProperty()
  protected error: string | null = null;

  public getError(): string | null
  {
    return this.error;
  }

  public setError(error: string | null)
  {
    this.error = error;
  }
}

import {BaseResponseDto} from "../base-response.dto";
import { JsonObject, JsonProperty } from 'typescript-json-serializer';

@JsonObject()
export class AuthTokenResponseDto extends BaseResponseDto {
  @JsonProperty()
  protected token: string | null = null;

  public getToken(): string | null {
    return this.token;
  }

  public setToken(token: string | null): void {
    this.token = token;
  }
}

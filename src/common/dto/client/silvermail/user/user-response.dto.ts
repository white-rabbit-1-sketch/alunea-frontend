import {BaseResponseDto} from "../base-response.dto";
import {UserDto} from "./entity/user.dto";
import { JsonObject, JsonProperty } from 'typescript-json-serializer';

@JsonObject()
export class UserResponseDto extends BaseResponseDto {
  @JsonProperty({type: UserDto})
  protected user: UserDto | null = null;

  public getUser(): UserDto | null {
    return this.user;
  }

  public setUser(user: UserDto | null): void {
    this.user = user;
  }
}

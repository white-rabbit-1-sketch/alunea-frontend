import {BaseResponseDto} from "../base-response.dto";
import { JsonObject, JsonProperty } from 'typescript-json-serializer';

@JsonObject()
export class MailboxAvailabilityResponseDto extends BaseResponseDto {
  @JsonProperty()
  protected isAvailable: boolean = false;

  public getIsAvailable(): boolean {
    return this.isAvailable;
  }

  public setIsAvailable(isAvailable: boolean): void {
    this.isAvailable = isAvailable;
  }
}

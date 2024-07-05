import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import {BaseResponseDto} from "../base-response.dto";

@JsonObject()
export class DomainAvailabilityResponseDto extends BaseResponseDto {
  @JsonProperty()
  protected isAvailable: boolean = false;

  public getIsAvailable(): boolean {
    return this.isAvailable;
  }

  public setIsAvailable(isAvailable: boolean): void {
    this.isAvailable = isAvailable;
  }
}

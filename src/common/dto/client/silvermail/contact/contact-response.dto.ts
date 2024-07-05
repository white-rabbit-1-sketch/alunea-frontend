import {BaseResponseDto} from "../base-response.dto";
import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import {ContactDto} from "./entity/contact.dto";

@JsonObject()
export class ContactResponseDto extends BaseResponseDto {
  @JsonProperty({type: ContactDto})
  protected contact: ContactDto | null = null;

  public getContact(): ContactDto | null {
    return this.contact;
  }

  public setContact(contact: ContactDto | null): void {
    this.contact = contact;
  }
}

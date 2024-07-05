import {BaseResponseDto} from "../base-response.dto";
import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import {ContactDto} from "./entity/contact.dto";

@JsonObject()
export class ContactListResponseDto extends BaseResponseDto {
  @JsonProperty({type: ContactDto})
  protected contactList: ContactDto[] = [];

  public getContactList(): ContactDto[] {
    return this.contactList;
  }

  public setAliasList(contactList: ContactDto[]): void {
    this.contactList = contactList;
  }
}

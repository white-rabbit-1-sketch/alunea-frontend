import {BaseResponseDto} from "../base-response.dto";
import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import {MailboxDto} from "./entity/mailbox.dto";

@JsonObject()
export class MailboxListResponseDto extends BaseResponseDto {
  @JsonProperty({type: MailboxDto})
  protected mailboxList: MailboxDto[] = [];

  public getMailboxList(): MailboxDto[] {
    return this.mailboxList;
  }

  public setMailboxList(mailboxList: MailboxDto[]): void {
    this.mailboxList = mailboxList;
  }
}

import {BaseResponseDto} from "../base-response.dto";
import {MailboxDto} from "./entity/mailbox.dto";
import { JsonObject, JsonProperty } from 'typescript-json-serializer';

@JsonObject()
export class MailboxResponseDto extends BaseResponseDto {
  @JsonProperty({type: MailboxDto})
  protected mailbox: MailboxDto | null = null;

  public getMailbox(): MailboxDto | null {
    return this.mailbox;
  }

  public setMailbox(mailbox: MailboxDto | null): void {
    this.mailbox = mailbox;
  }
}

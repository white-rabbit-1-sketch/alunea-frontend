import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import {MailboxDto} from "../../mailbox/entity/mailbox.dto";
import {AbstractAliasDto} from "./abstract-alias.dto";

@JsonObject()
export class MailboxAliasDto extends AbstractAliasDto {
  @JsonProperty({type: MailboxDto})
  protected mailbox: MailboxDto | null = null;

  public getMailbox(): MailboxDto | null {
    return this.mailbox;
  }

  public setMailbox(mailbox: MailboxDto | null): void {
    this.mailbox = mailbox;
  }
}

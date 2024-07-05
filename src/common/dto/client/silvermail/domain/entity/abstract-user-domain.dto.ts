import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import {AbstractDomainDto} from "./abstract-domain.dto";
import {MailboxDto} from "../../mailbox/entity/mailbox.dto";

@JsonObject()
export abstract class AbstractUserDomainDto extends AbstractDomainDto{
  @JsonProperty({type: MailboxDto})
  protected catchAllMailbox: MailboxDto | null = null;

  public getCatchAllMailbox(): MailboxDto | null {
    return this.catchAllMailbox;
  }

  public setCatchAllMailbox(mailboxDto: MailboxDto | null): void {
    this.catchAllMailbox = mailboxDto;
  }
}

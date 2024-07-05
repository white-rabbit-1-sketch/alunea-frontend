import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import {AbstractAliasDto} from "./abstract-alias.dto";
import {ContactDto} from "../../contact/entity/contact.dto";
import {MailboxAliasDto} from "./mailbox-alias.dto";

@JsonObject()
export class ContactAliasDto extends AbstractAliasDto{
  @JsonProperty({type: ContactDto})
  protected contact: ContactDto | null = null;
  @JsonProperty({type: MailboxAliasDto})
  protected mailboxAlias: MailboxAliasDto | null = null;

  public getContact(): ContactDto | null {
    return this.contact;
  }

  public setContact(contact: ContactDto | null): void {
    this.contact = contact;
  }

  public getMailboxAlias(): MailboxAliasDto | null {
    return this.mailboxAlias;
  }

  public setMailboxAlias(mailboxAlias: MailboxAliasDto | null): void {
    this.mailboxAlias = mailboxAlias;
  }
}

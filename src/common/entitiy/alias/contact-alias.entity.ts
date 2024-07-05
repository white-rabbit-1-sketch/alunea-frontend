import {AbstractAlias} from "./abstract-alias.entity";
import {Contact} from "../contact.entity";
import {MailboxAlias} from "./mailbox-alias.entity";

export class ContactAlias extends AbstractAlias {
  protected contact: Contact | null = null;
  protected mailboxAlias: MailboxAlias | null = null;

  public getContact(): Contact | null {
    return this.contact;
  }

  public setContact(contact: Contact | null): void {
    this.contact = contact;
  }

  public getMailboxAlias(): MailboxAlias | null {
    return this.mailboxAlias;
  }

  public setMailboxAlias(mailboxAlias: MailboxAlias | null): void {
    this.mailboxAlias = mailboxAlias;
  }
}

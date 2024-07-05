import {Mailbox} from "../mailbox.entity";
import {AbstractAlias} from "./abstract-alias.entity";

export class MailboxAlias extends AbstractAlias {
  protected mailbox: Mailbox | null = null;

  public getMailbox(): Mailbox | null {
    return this.mailbox;
  }

  public setMailbox(mailbox: Mailbox | null): void {
    this.mailbox = mailbox;
  }
}

import {AbstractDomain} from "./abstract-domain.entity";
import {Mailbox} from "../mailbox.entity";

export abstract class AbstractUserDomain extends AbstractDomain {
  protected catchAllMailbox: Mailbox | null = null;

  public getCatchAllMailbox(): Mailbox | null {
    return this.catchAllMailbox;
  }

  public setCatchAllMailbox(mailbox: Mailbox | null): void {
    this.catchAllMailbox = mailbox;
  }
}

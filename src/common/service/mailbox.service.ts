import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {EventService} from "./event.service";
import {MailboxRepository} from "../repository/silvermail/mailbox.repository";
import {Mailbox} from "../entitiy/mailbox.entity";

@Injectable({
  providedIn: 'root',
})
export class MailboxService {
  constructor(
    protected mailboxRepository: MailboxRepository,
    protected eventService: EventService
  ) {
  }

  public isMailboxAvailable(userId: string, email: string): Observable<boolean>
  {
    return this.mailboxRepository.isMailboxAvailable(userId, email);
  }

  public createMailbox(userId: string, email: string): Observable<Mailbox>
  {
    return this.mailboxRepository.createMailbox(userId, email).pipe(
      map((mailbox: Mailbox) => {
        this.eventService.publishMailboxAddedEvent(mailbox);

        return mailbox;
      })
    );
  }

  public getMailboxList(userId: string): Observable<Mailbox[]>
  {
    return this.mailboxRepository.getMailboxList(userId);
  }

  public enableMailbox(mailbox: Mailbox): Observable<null>
  {
    return this.mailboxRepository.enableMailbox(mailbox.getId() as string).pipe(
      map(() => {
        mailbox.setIsEnabled(true);

        return null;
      })
    );
  }

  public disableMailbox(mailbox: Mailbox): Observable<null>
  {
    return this.mailboxRepository.disableMailbox(mailbox.getId() as string).pipe(
      map(() => {
        mailbox.setIsEnabled(false);

        return null;
      })
    );
  }

  public removeMailbox(mailbox: Mailbox): Observable<null>
  {
    return this.mailboxRepository.removeMailbox(mailbox.getId() as string);
  }

  public sendMailboxEmailVerificationEmail(mailboxId: string): Observable<null>
  {
      return this.mailboxRepository.sendMailboxEmailVerificationEmail(mailboxId);
  }

  public verifyMailboxEmail(token: string): Observable<null>
  {
    return this.mailboxRepository.verifyMailboxEmail(token);
  }

  public favoriteMailbox(mailbox: Mailbox): Observable<null>
  {
    return this.mailboxRepository.favoriteMailbox(mailbox.getId() as string).pipe(
      map(() => {
        mailbox.setIsFavorite(true);

        return null;
      })
    );
  }
}

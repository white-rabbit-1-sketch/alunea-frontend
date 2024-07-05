import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {EventService} from "./event.service";
import {AliasRepository} from "../repository/silvermail/alias.repository";
import {MailboxAlias} from "../entitiy/alias/mailbox-alias.entity";
import {AbstractAlias} from "../entitiy/alias/abstract-alias.entity";
import {ContactAlias} from "../entitiy/alias/contact-alias.entity";
import {AliasTypeMailbox} from "../enum/alias-type.enum";
import {AliasListResponseDto} from "../dto/client/silvermail/alias/alias-list-response.dto";
import {MailboxAliasDto} from "../dto/client/silvermail/alias/entity/mailbox-alias.dto";

@Injectable({
  providedIn: 'root',
})
export class AliasService {
  constructor(
    protected aliasRepository: AliasRepository,
    protected eventService: EventService
  ) {
  }

  public isAliasRecipientAvailable(userId: string, domainId: string, recipient: string): Observable<boolean>
  {
    return this.aliasRepository.isAliasRecipientAvailable(userId, domainId, recipient);
  }

  public createMailboxAlias(userId: string, mailboxId: string, domainId: string, recipient: string): Observable<MailboxAlias>
  {
    return this.aliasRepository.createMailboxAlias(userId, mailboxId, domainId, recipient).pipe(
      map((alias: MailboxAlias) => {
        this.eventService.publishMailboxAliasAddedEvent(alias);

        return alias;
      })
    );
  }

  public createContactAlias(userId: string, contactId: string, mailboxAliasId: string, recipient: string): Observable<ContactAlias>
  {
    return this.aliasRepository.createContactAlias(userId, contactId, mailboxAliasId, recipient).pipe(
        map((alias: ContactAlias) => {
          this.eventService.publishContactAliasAddedEvent(alias);

          return alias;
        })
    );
  }

  public getMailboxAliasList(userId: string): Observable<MailboxAlias[]>
  {
    return this.aliasRepository.getMailboxAliasList(userId);
  }

  public getContactAliasList(userId: string): Observable<ContactAlias[]>
  {
    return this.aliasRepository.getContactAliasList(userId);
  }

  public enableAlias(alias: AbstractAlias): Observable<null>
  {
    return this.aliasRepository.enableAlias(alias.getId() as string).pipe(
      map(() => {
        alias.setIsEnabled(true);

        if (alias.getType() == AliasTypeMailbox) {
          this.eventService.publishMailboxAliasUpdatedEvent(alias as MailboxAlias);
        }

        return null;
      })
    );
  }

  public disableAlias(alias: AbstractAlias): Observable<null>
  {
    return this.aliasRepository.disableAlias(alias.getId() as string).pipe(
      map(() => {
        alias.setIsEnabled(false);

        if (alias.getType() == AliasTypeMailbox) {
          this.eventService.publishMailboxAliasUpdatedEvent(alias as MailboxAlias);
        }

        return null;
      })
    );
  }

  public removeAlias(alias: AbstractAlias): Observable<null>
  {
    return this.aliasRepository.removeAlias(alias.getId() as string).pipe(
        map(() => {
          if (alias.getType() == AliasTypeMailbox) {
            this.eventService.publishMailboxAliasRemovedEvent(alias as MailboxAlias);
          }

          return null;
        })
    );
  }
}

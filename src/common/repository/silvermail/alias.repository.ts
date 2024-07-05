import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {AliasClient} from "../../client/silvermail/alias.client";
import {AliasRecipientAvailabilityResponseDto} from "../../dto/client/silvermail/alias/alias-recipient-availability-response.dto";
import {AliasResponseDto} from "../../dto/client/silvermail/alias/alias-response.dto";
import {AliasListResponseDto} from "../../dto/client/silvermail/alias/alias-list-response.dto";
import {MailboxAlias} from "../../entitiy/alias/mailbox-alias.entity";
import {MailboxAliasMapper} from "./mapper/entity/alias/mailbox-alias.mapper";
import {MailboxAliasDto} from "../../dto/client/silvermail/alias/entity/mailbox-alias.dto";
import {ContactAlias} from "../../entitiy/alias/contact-alias.entity";
import {ContactAliasMapper} from "./mapper/entity/alias/contact-alias.mapper";
import {ContactAliasDto} from "../../dto/client/silvermail/alias/entity/contact-alias.dto";

@Injectable({
  providedIn: 'root'
})
export class AliasRepository {
  constructor(
    protected aliasClient: AliasClient,
    protected mailboxAliasMapper: MailboxAliasMapper,
    protected contactAliasMapper: ContactAliasMapper,
  ) {
  }

  public isAliasRecipientAvailable(userId: string, domainId: string, recipient: string): Observable<boolean>
  {
    return this.aliasClient.isAliasRecipientAvailable(userId, domainId, recipient).pipe(
      map((aliasExistsResponseDto: AliasRecipientAvailabilityResponseDto) => (aliasExistsResponseDto.getIsAvailable()))
    );
  }

  public createMailboxAlias(
    userId: string,
    mailboxId: string,
    domainId: string,
    recipient: string
  ): Observable<MailboxAlias> {
    return this.aliasClient.createMailboxAlias(userId, mailboxId, domainId, recipient).pipe(
      map((aliasResponseDto: AliasResponseDto) => {
        if (!aliasResponseDto.getAlias()) {
          throw new Error('Invalid alias');
        }

        return this.mailboxAliasMapper.mapMailboxAliasFromMailboxAliasDto(
          aliasResponseDto.getAlias() as MailboxAliasDto
        );
      })
    );
  }

  public createContactAlias(
      userId: string,
      contactId: string,
      mailboxAliasId: string,
      recipient: string
  ): Observable<ContactAlias> {
    return this.aliasClient.createContactAlias(userId, contactId, mailboxAliasId, recipient).pipe(
        map((aliasResponseDto: AliasResponseDto) => {
          if (!aliasResponseDto.getAlias()) {
            throw new Error('Invalid alias');
          }

          return this.contactAliasMapper.mapContactAliasFromContactAliasDto(
              aliasResponseDto.getAlias() as ContactAliasDto
          );
        })
    );
  }

  public getMailboxAliasList(userId: string): Observable<MailboxAlias[]>
  {
    return this.aliasClient.getMailboxAliasList(userId).pipe(
      map((aliasListResponseDto: AliasListResponseDto) => {
        return this.mailboxAliasMapper.mapMailboxAliasListFromMailboxAliasDtoList(
          aliasListResponseDto.getAliasList() as MailboxAliasDto[]
        );
      })
    );
  }

  public getContactAliasList(userId: string): Observable<ContactAlias[]>
  {
    return this.aliasClient.getContactAliasList(userId).pipe(
        map((aliasListResponseDto: AliasListResponseDto) => {
          return this.contactAliasMapper.mapContactAliasListFromContactAliasDtoList(
              aliasListResponseDto.getAliasList() as ContactAliasDto[]
          );
        })
    );
  }

  public enableAlias(aliasId: string): Observable<null>
  {
    return this.aliasClient.enableAlias(aliasId);
  }

  public disableAlias(aliasId: string): Observable<null>
  {
    return this.aliasClient.disableAlias(aliasId);
  }

  public removeAlias(aliasId: string): Observable<null>
  {
    return this.aliasClient.removeAlias(aliasId);
  }
}

import {Injectable} from '@angular/core';
import {AbstractAliasMapper} from "./abstract-alias.mapper";
import {UniversalDomainMapper} from "../domain/universal-domain.mapper";
import {MailboxMapper} from "../mailbox.mapper";
import {MailboxAliasDto} from "../../../../../dto/client/silvermail/alias/entity/mailbox-alias.dto";
import {MailboxAlias} from "../../../../../entitiy/alias/mailbox-alias.entity";
import {MailboxDto} from "../../../../../dto/client/silvermail/mailbox/entity/mailbox.dto";

@Injectable({
  providedIn: 'root'
})
export class MailboxAliasMapper extends AbstractAliasMapper {
  constructor(
    protected override universalDomainMapper: UniversalDomainMapper,
    protected mailboxMapper: MailboxMapper
  ) {
    super(universalDomainMapper);
  }

  public mapMailboxAliasFromMailboxAliasDto(
    mailboxAliasDto: MailboxAliasDto
  ): MailboxAlias {
    const mailboxAlias = new MailboxAlias();
    mailboxAlias.setMailbox(this.mailboxMapper.mapMailboxFromMailboxDto(
        mailboxAliasDto.getMailbox() as MailboxDto
    ));
    this.mapAbstractAliasFromAbstractAliasDto(mailboxAlias, mailboxAliasDto);

    return mailboxAlias;
  }

  public mapMailboxAliasListFromMailboxAliasDtoList(
    mailboxAliasDtoList: MailboxAliasDto[]
  ): MailboxAlias[] {
    const mailboxAliasList: MailboxAlias[] = [];

    mailboxAliasDtoList.forEach(mailboxAliasDto => {
      mailboxAliasList.push(
        this.mapMailboxAliasFromMailboxAliasDto(mailboxAliasDto)
      );
    });

    return mailboxAliasList;
  }
}

import {Injectable} from '@angular/core';
import {AbstractAliasMapper} from "./abstract-alias.mapper";
import {UniversalDomainMapper} from "../domain/universal-domain.mapper";
import {ContactMapper} from "../contact.mapper";
import {ContactAliasDto} from "../../../../../dto/client/silvermail/alias/entity/contact-alias.dto";
import {ContactAlias} from "../../../../../entitiy/alias/contact-alias.entity";
import {ContactDto} from "../../../../../dto/client/silvermail/contact/entity/contact.dto";
import {MailboxAliasMapper} from "./mailbox-alias.mapper";
import {MailboxAliasDto} from "../../../../../dto/client/silvermail/alias/entity/mailbox-alias.dto";

@Injectable({
  providedIn: 'root'
})
export class ContactAliasMapper extends AbstractAliasMapper {
  constructor(
    protected override universalDomainMapper: UniversalDomainMapper,
    protected contactMapper: ContactMapper,
    protected mailboxAliasMapper: MailboxAliasMapper
  ) {
    super(universalDomainMapper);
  }

  public mapContactAliasFromContactAliasDto(
    contactAliasDto: ContactAliasDto
  ): ContactAlias {
    const contactAlias = new ContactAlias();
    contactAlias.setContact(this.contactMapper.mapContactFromContactDto(
        contactAliasDto.getContact() as ContactDto
    ));
    contactAlias.setMailboxAlias(this.mailboxAliasMapper.mapMailboxAliasFromMailboxAliasDto(
        contactAliasDto.getMailboxAlias() as MailboxAliasDto
    ));
    this.mapAbstractAliasFromAbstractAliasDto(contactAlias, contactAliasDto);

    return contactAlias;
  }

  public mapContactAliasListFromContactAliasDtoList(
    contactAliasDtoList: ContactAliasDto[]
  ): ContactAlias[] {
    const contactAliasList: ContactAlias[] = [];

    contactAliasDtoList.forEach(contactAliasDto => {
      contactAliasList.push(
        this.mapContactAliasFromContactAliasDto(contactAliasDto)
      );
    });

    return contactAliasList;
  }
}

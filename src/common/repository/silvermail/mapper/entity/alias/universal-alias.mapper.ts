import {Injectable} from '@angular/core';
import {AbstractDomain} from "../../../../../entitiy/domain/abstract-domain.entity";
import {AbstractDomainDto} from "../../../../../dto/client/silvermail/domain/entity/abstract-domain.dto";
import {MailboxAliasMapper} from "./mailbox-alias.mapper";
import {ContactAliasMapper} from "./contact-alias.mapper";
import {AbstractAliasDto} from "../../../../../dto/client/silvermail/alias/entity/abstract-alias.dto";
import {AliasTypeContact, AliasTypeMailbox} from "../../../../../enum/alias-type.enum";
import {MailboxAliasDto} from "../../../../../dto/client/silvermail/alias/entity/mailbox-alias.dto";
import {ContactAliasDto} from "../../../../../dto/client/silvermail/alias/entity/contact-alias.dto";
import {AbstractAlias} from "../../../../../entitiy/alias/abstract-alias.entity";

@Injectable({
  providedIn: 'root'
})
export class UniversalAliasMapper {
  constructor(
      protected mailboxAliasMapper: MailboxAliasMapper,
      protected contactAliasMapper: ContactAliasMapper,
  ) {
  }

  public mapAliasFromAliasDto(
      aliasDto: AbstractAliasDto
  ): AbstractAlias {
    if (aliasDto.getType() == AliasTypeMailbox) {
      return this.mailboxAliasMapper.mapMailboxAliasFromMailboxAliasDto(aliasDto as MailboxAliasDto);
    }
    if (aliasDto.getType() == AliasTypeContact) {
      return this.contactAliasMapper.mapContactAliasFromContactAliasDto(aliasDto as ContactAliasDto);
    }

    throw new Error("Unsupported domain type");
  }

  public mapAliasListFromAliasDtoList(
      aliasDtoList: AbstractAliasDto[]
  ): AbstractAlias[] {
    const aliasList: AbstractAlias[] = [];

    aliasDtoList.forEach(aliasDto => {
      aliasList.push(
          this.mapAliasFromAliasDto(aliasDto)
      );
    });

    return aliasList;
  }
}

import {Injectable} from '@angular/core';
import {AbstractDomainMapper} from "./abstract-domain.mapper";
import {CustomDomain} from "../../../../../entitiy/domain/custom-domain.entity";
import {CustomDomainDto} from "../../../../../dto/client/silvermail/domain/entity/custom-domain.dto";
import {MailboxMapper} from "../mailbox.mapper";
import {MailboxDto} from "../../../../../dto/client/silvermail/mailbox/entity/mailbox.dto";

@Injectable({
  providedIn: 'root'
})
export class CustomDomainMapper extends AbstractDomainMapper{
  constructor(
    protected mailboxMapper: MailboxMapper
  ) {
    super();
  }

  public mapCustomDomainFromCustomDomainDto(
    customDomainDto: CustomDomainDto
  ): CustomDomain {
    const customDomain = new CustomDomain();
    this.mapAbstractDomainFromAbstractDomainDto(customDomain, customDomainDto);
    if (customDomainDto.getCatchAllMailbox()) {
      customDomain.setCatchAllMailbox(this.mailboxMapper.mapMailboxFromMailboxDto(
        customDomainDto.getCatchAllMailbox() as MailboxDto
      ));
    }

    return customDomain;
  }

  public mapCustomDomainListFromCustomDomainDtoList(
    customDomainDtoList: CustomDomainDto[]
  ): CustomDomain[] {
    const customDomainList: CustomDomain[] = [];

    customDomainDtoList.forEach(customDomainDto => {
      customDomainList.push(
        this.mapCustomDomainFromCustomDomainDto(customDomainDto)
      );
    });

    return customDomainList;
  }
}

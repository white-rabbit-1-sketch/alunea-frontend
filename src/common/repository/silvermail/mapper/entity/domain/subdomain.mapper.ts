import {Injectable} from '@angular/core';
import {Subdomain} from "../../../../../entitiy/domain/subdomain.entity";
import {AbstractDomainMapper} from "./abstract-domain.mapper";
import {SubdomainDto} from "../../../../../dto/client/silvermail/domain/entity/subdomain.dto";
import {ContactDto} from "../../../../../dto/client/silvermail/contact/entity/contact.dto";
import {MailboxMapper} from "../mailbox.mapper";
import {MailboxDto} from "../../../../../dto/client/silvermail/mailbox/entity/mailbox.dto";

@Injectable({
  providedIn: 'root'
})
export class SubdomainMapper extends AbstractDomainMapper {
  constructor(
    protected mailboxMapper: MailboxMapper
  ) {
    super();
  }

  public mapSubdomainFromSubdomainDto(
    subdomainDto: SubdomainDto
  ): Subdomain {
    const subdomain = new Subdomain();
    this.mapAbstractDomainFromAbstractDomainDto(subdomain, subdomainDto);

    subdomain.setSubdomain(subdomainDto.getSubdomain());
    if (subdomainDto.getCatchAllMailbox()) {
      subdomain.setCatchAllMailbox(this.mailboxMapper.mapMailboxFromMailboxDto(
        subdomainDto.getCatchAllMailbox() as MailboxDto
      ));
    }

    return subdomain;
  }

  public mapSubdomainListFromSubdomainDtoList(
    subdomainDtoList: SubdomainDto[]
  ): Subdomain[] {
    const subdomainList: Subdomain[] = [];

    subdomainDtoList.forEach(subdomainResponseEntityDto => {
      subdomainList.push(
        this.mapSubdomainFromSubdomainDto(subdomainResponseEntityDto)
      );
    });

    return subdomainList;
  }
}

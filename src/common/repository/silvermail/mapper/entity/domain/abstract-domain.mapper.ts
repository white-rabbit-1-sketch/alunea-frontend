import {Injectable} from '@angular/core';
import {AbstractDomain} from "../../../../../entitiy/domain/abstract-domain.entity";
import {SystemDomain} from "../../../../../entitiy/domain/system-domain.entity";
import {AbstractDomainDto} from "../../../../../dto/client/silvermail/domain/entity/abstract-domain.dto";

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractDomainMapper {
  public mapAbstractDomainFromAbstractDomainDto(
    abstractDomain: AbstractDomain,
    abstractDomainDto: AbstractDomainDto
  ): AbstractDomain {
    abstractDomain.setId(abstractDomainDto.getId());
    abstractDomain.setDomain(abstractDomainDto.getDomain());
    abstractDomain.setIsEnabled(abstractDomainDto.getIsEnabled());
    abstractDomain.setAliasesCount(abstractDomainDto.getAliasesCount());

    return abstractDomain;
  }
}

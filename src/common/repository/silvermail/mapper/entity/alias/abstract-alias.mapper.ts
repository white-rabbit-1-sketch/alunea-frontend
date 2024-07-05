import {Injectable} from '@angular/core';
import {AbstractDomainDto} from "../../../../../dto/client/silvermail/domain/entity/abstract-domain.dto";
import {AbstractAlias} from "../../../../../entitiy/alias/abstract-alias.entity";
import {AbstractAliasDto} from "../../../../../dto/client/silvermail/alias/entity/abstract-alias.dto";
import {UniversalDomainMapper} from "../domain/universal-domain.mapper";

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractAliasMapper {
  constructor(
      protected universalDomainMapper: UniversalDomainMapper,
  ) {
  }

  public mapAbstractAliasFromAbstractAliasDto(
    alias: AbstractAlias,
    aliasDto: AbstractAliasDto
  ): AbstractAlias {
    alias.setId(aliasDto.getId());
    alias.setType(aliasDto.getType());
    alias.setDomain(this.universalDomainMapper.mapDomainFromDomainDto(
        aliasDto.getDomain() as AbstractDomainDto
    ));
    alias.setRecipient(aliasDto.getRecipient());
    alias.setIsEnabled(aliasDto.getIsEnabled());

    return alias;
  }
}

import {Injectable} from '@angular/core';
import {AbstractDomain} from "../../../../../entitiy/domain/abstract-domain.entity";
import {SystemDomainMapper} from "./system-domain.mapper";
import {CustomDomainMapper} from "./custom-domain.mapper";
import {SubdomainMapper} from "./subdomain.mapper";
import {DomainTypeCustom, DomainTypeSubdomain, DomainTypeSystem} from "../../../../../enum/domain-type.enum";
import {AbstractDomainDto} from "../../../../../dto/client/silvermail/domain/entity/abstract-domain.dto";
import {SystemDomainDto} from "../../../../../dto/client/silvermail/domain/entity/system-domain.dto";
import {CustomDomainDto} from "../../../../../dto/client/silvermail/domain/entity/custom-domain.dto";
import {SubdomainDto} from "../../../../../dto/client/silvermail/domain/entity/subdomain.dto";

@Injectable({
  providedIn: 'root'
})
export class UniversalDomainMapper {
  constructor(
    protected systemDomainMapper: SystemDomainMapper,
    protected customDomainMapper: CustomDomainMapper,
    protected subdomainMapper: SubdomainMapper,
  ) {

  }

  public mapDomainFromDomainDto(
    domainDto: AbstractDomainDto
  ): AbstractDomain {
    if (domainDto.getType() == DomainTypeSystem) {
      return this.systemDomainMapper.mapSystemDomainFromSystemDomainDto(domainDto as SystemDomainDto);
    }
    if (domainDto.getType() == DomainTypeCustom) {
      return this.customDomainMapper.mapCustomDomainFromCustomDomainDto(domainDto as CustomDomainDto);
    }
    if (domainDto.getType() == DomainTypeSubdomain) {
      return this.subdomainMapper.mapSubdomainFromSubdomainDto(domainDto as SubdomainDto);
    }

    throw new Error("Unsupported domain type");
  }

  public mapDomainListFromDomainDtoList(
    domainDtoList: AbstractDomainDto[]
  ): AbstractDomain[] {
    const domainList: AbstractDomain[] = [];

    domainDtoList.forEach(domainDto => {
      domainList.push(
        this.mapDomainFromDomainDto(domainDto)
      );
    });

    return domainList;
  }
}

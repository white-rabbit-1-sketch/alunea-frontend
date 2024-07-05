import {Injectable} from '@angular/core';
import {SystemDomain} from "../../../../../entitiy/domain/system-domain.entity";
import {AbstractDomainMapper} from "./abstract-domain.mapper";
import {SystemDomainDto} from "../../../../../dto/client/silvermail/domain/entity/system-domain.dto";

@Injectable({
  providedIn: 'root'
})
export class SystemDomainMapper extends AbstractDomainMapper{
  public mapSystemDomainFromSystemDomainDto(
    systemDomainDto: SystemDomainDto
  ): SystemDomain {
    const systemDomain = new SystemDomain();
    this.mapAbstractDomainFromAbstractDomainDto(systemDomain, systemDomainDto);

    return systemDomain;
  }

  public mapSystemDomainListFromSystemDomainDtoList(
    systemDomainDtoList: SystemDomainDto[]
  ): SystemDomain[] {
    const systemDomainList: SystemDomain[] = [];

    systemDomainDtoList.forEach(systemDomainDto => {
      systemDomainList.push(
        this.mapSystemDomainFromSystemDomainDto(systemDomainDto)
      );
    });

    return systemDomainList;
  }
}

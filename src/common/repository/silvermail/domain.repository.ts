import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {DomainClient} from "../../client/silvermail/domain.client";
import {CustomDomainMapper} from "./mapper/entity/domain/custom-domain.mapper";
import {SystemDomainMapper} from "./mapper/entity/domain/system-domain.mapper";
import {SubdomainMapper} from "./mapper/entity/domain/subdomain.mapper";
import {CustomDomain} from "../../entitiy/domain/custom-domain.entity";
import {DomainListResponseDto} from "../../dto/client/silvermail/domain/domain-list-response.dto";
import {CustomDomainDto} from "../../dto/client/silvermail/domain/entity/custom-domain.dto";
import {SystemDomain} from "../../entitiy/domain/system-domain.entity";
import {SystemDomainDto} from "../../dto/client/silvermail/domain/entity/system-domain.dto";
import {Subdomain} from "../../entitiy/domain/subdomain.entity";
import {DomainAvailabilityResponseDto} from "../../dto/client/silvermail/domain/domain-availability-response.dto";
import {DomainResponseDto} from "../../dto/client/silvermail/domain/domain-response.dto";
import {SubdomainDto} from "../../dto/client/silvermail/domain/entity/subdomain.dto";

@Injectable({
  providedIn: 'root'
})
export class DomainRepository {
  constructor(
    protected domainClient: DomainClient,
    protected customDomainMapper: CustomDomainMapper,
    protected systemDomainMapper: SystemDomainMapper,
    protected subdomainMapper: SubdomainMapper,
  ) {
  }

  public getCustomDomainList(userId: string): Observable<CustomDomain[]>
  {
    return this.domainClient.getCustomDomainList(userId).pipe(
      map((domainListResponseDto: DomainListResponseDto) => {
        return this.customDomainMapper.mapCustomDomainListFromCustomDomainDtoList(
            domainListResponseDto.getDomainList() as CustomDomainDto[]
        );
      })
    );
  }

  public getSystemDomainList(): Observable<SystemDomain[]>
  {
    return this.domainClient.getSystemDomainList().pipe(
        map((domainListResponseDto: DomainListResponseDto) => {
          return this.systemDomainMapper.mapSystemDomainListFromSystemDomainDtoList(
              domainListResponseDto.getDomainList() as SystemDomainDto[]
          );
        })
    );
  }

  public getSubdomainList(userId: string): Observable<Subdomain[]>
  {
    return this.domainClient.getSubdomainList(userId).pipe(
        map((domainListResponseDto: DomainListResponseDto) => {
          return this.subdomainMapper.mapSubdomainListFromSubdomainDtoList(
              domainListResponseDto.getDomainList() as SubdomainDto[]
          );
        })
    );
  }

  public isSubdomainAvailable(systemDomainId: string, subdomain: string): Observable<boolean>
  {
    return this.domainClient.isSubdomainAvailable(systemDomainId, subdomain).pipe(
        map((domainAvailabilityResponseDto: DomainAvailabilityResponseDto) => (domainAvailabilityResponseDto.getIsAvailable()))
    );
  }

  public createSubdomain(userId: string, systemDomainId: string, subdomain: string): Observable<Subdomain>
  {
    return this.domainClient.createSubdomain(userId, systemDomainId, subdomain).pipe(
        map((domainResponseDto: DomainResponseDto) => {
          if (!domainResponseDto.getDomain()) {
            throw new Error('Invalid subdomain');
          }

          return this.subdomainMapper.mapSubdomainFromSubdomainDto(
              domainResponseDto.getDomain() as SubdomainDto
          );
        })
    );
  }

  public enableDomain(domainId: string): Observable<null>
  {
    return this.domainClient.enableDomain(domainId);
  }

  public disableDomain(domainId: string): Observable<null>
  {
    return this.domainClient.disableDomain(domainId);
  }

  public removeDomain(domainId: string): Observable<null>
  {
    return this.domainClient.removeDomain(domainId);
  }

  public enableDomainCatchAll(domainId: string, mailboxId: string): Observable<null>
  {
    return this.domainClient.enableDomainCatchAll(domainId, mailboxId);
  }

  public disableDomainCatchAll(domainId: string): Observable<null>
  {
    return this.domainClient.disableDomainCatchAll(domainId);
  }
}

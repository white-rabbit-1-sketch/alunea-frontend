import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {DomainRepository} from "../repository/silvermail/domain.repository";
import {EventService} from "./event.service";
import {Subdomain} from "../entitiy/domain/subdomain.entity";
import {SystemDomain} from "../entitiy/domain/system-domain.entity";
import {CustomDomain} from "../entitiy/domain/custom-domain.entity";
import {AbstractDomain} from "../entitiy/domain/abstract-domain.entity";
import {AbstractUserDomain} from "../entitiy/domain/abstract-user-domain.entity";
import {Mailbox} from "../entitiy/mailbox.entity";

@Injectable({
  providedIn: 'root',
})
export class DomainService {
  constructor(
    protected domainRepository: DomainRepository,
    protected eventService: EventService
  ) {
  }

  public getSystemDomainList(): Observable<SystemDomain[]>
  {
    return this.domainRepository.getSystemDomainList();
  }

  public getSubdomainList(userId: string): Observable<Subdomain[]>
  {
    return this.domainRepository.getSubdomainList(userId);
  }

  public getCustomDomainList(userId: string): Observable<CustomDomain[]>
  {
    return this.domainRepository.getCustomDomainList(userId);
  }

  public isSubdomainAvailable(systemDomainId: string, subdomain: string): Observable<boolean>
  {
    return this.domainRepository.isSubdomainAvailable(systemDomainId, subdomain);
  }

  public createSubdomain(userId: string, systemDomainId: string, subdomain: string): Observable<Subdomain>
  {
    return this.domainRepository.createSubdomain(userId, systemDomainId, subdomain).pipe(
      map((subdomain: Subdomain) => {
        this.eventService.publishSubdomainAddedEvent(subdomain);

        return subdomain;
      })
    );
  }

  public enableDomain(domain: AbstractDomain): Observable<null>
  {
    return this.domainRepository.enableDomain(domain.getId() as string).pipe(
      map(() => {
        domain.setIsEnabled(true);

        return null;
      })
    );
  }

  public disableDomain(domain: AbstractDomain): Observable<null>
  {
    return this.domainRepository.disableDomain(domain.getId() as string).pipe(
      map(() => {
        domain.setIsEnabled(false);

        return null;
      })
    );
  }

  public removeDomain(domain: AbstractDomain): Observable<null>
  {
    return this.domainRepository.removeDomain(domain.getId() as string);
  }

  public enableDomainCatchAll(domain: AbstractUserDomain, mailbox: Mailbox): Observable<null>
  {
    return this.domainRepository.enableDomainCatchAll(domain.getId() as string, mailbox.getId() as string).pipe(
      map(() => {
        domain.setCatchAllMailbox(mailbox);

        return null;
      })
    );
  }

  public disableDomainCatchAll(domain: AbstractUserDomain): Observable<null>
  {
    return this.domainRepository.disableDomainCatchAll(domain.getId() as string).pipe(
      map(() => {
        domain.setCatchAllMailbox(null);

        return null;
      })
    );
  }
}

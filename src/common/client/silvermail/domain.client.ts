import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AbstractClient} from "./abstract.client";
import {DomainListResponseDto} from "../../dto/client/silvermail/domain/domain-list-response.dto";
import {DomainAvailabilityResponseDto} from "../../dto/client/silvermail/domain/domain-availability-response.dto";
import {DomainResponseDto} from "../../dto/client/silvermail/domain/domain-response.dto";

@Injectable({
  providedIn: 'root',
})
export class DomainClient extends AbstractClient {
  public getCustomDomainList(userId: string): Observable<DomainListResponseDto> {
    return this.get(`/user/${userId}/domain/custom`).pipe(
      map((response: any) => {
        return this.serializerService.deserialize(response, DomainListResponseDto)
      })
    );
  }

  public getSystemDomainList(): Observable<DomainListResponseDto> {
    return this.get(`/domain/system`).pipe(
        map((response: any) => {
          return this.serializerService.deserialize(response, DomainListResponseDto)
        })
    );
  }

  public getSubdomainList(userId: string): Observable<DomainListResponseDto> {
    return this.get(`/user/${userId}/domain/subdomain`).pipe(
        map((response: any) => {
          return this.serializerService.deserialize(response, DomainListResponseDto)
        })
    );
  }

  public isSubdomainAvailable(systemDomainId: string, subdomain: string): Observable<DomainAvailabilityResponseDto> {
    return this.get(`/domain/system/${systemDomainId}/subdomain/${subdomain}`).pipe(
        map((response: any) => {
          return this.serializerService.deserialize(response, DomainAvailabilityResponseDto)
        })
    );
  }

  public createSubdomain(
      userId: string,
      systemDomainId: string,
      subdomain: string
  ): Observable<DomainResponseDto> {
    return this.post(
        `/user/${userId}/domain/system/${systemDomainId}/subdomain`,
        {
          subdomain: subdomain
        }
    ).pipe(
        map((response: any) => {
          return this.serializerService.deserialize(response, DomainResponseDto)
        })
    );
  }

  public enableDomain(
      domainId: string
  ): Observable<null> {
    return this.post(
        `/domain/${domainId}/enable`,
        {}
    ).pipe(
        map(() => {
          return null;
        })
    );
  }

  public disableDomain(
      domainId: string
  ): Observable<null> {
    return this.post(
        `/domain/${domainId}/disable`,
        {}
    ).pipe(
        map(() => {
          return null;
        })
    );
  }

  public removeDomain(
      domainId: string
  ): Observable<null> {
    return this.delete(
        `/domain/${domainId}`,
    ).pipe(
        map(() => {
          return null;
        })
    );
  }

  public enableDomainCatchAll(
    domainId: string,
    mailboxId: string
  ): Observable<null> {
    return this.post(
      `/domain/${domainId}/mailbox/${mailboxId}/catch-all/enable`,
      {}
    ).pipe(
      map(() => {
        return null;
      })
    );
  }

  public disableDomainCatchAll(
    domainId: string
  ): Observable<null> {
    return this.post(
      `/domain/${domainId}/catch-all/disable`,
      {}
    ).pipe(
      map(() => {
        return null;
      })
    );
  }
}

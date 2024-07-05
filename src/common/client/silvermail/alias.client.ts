import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AbstractClient} from "./abstract.client";
import {AliasRecipientAvailabilityResponseDto} from "../../dto/client/silvermail/alias/alias-recipient-availability-response.dto";
import {AliasResponseDto} from "../../dto/client/silvermail/alias/alias-response.dto";
import {AliasListResponseDto} from "../../dto/client/silvermail/alias/alias-list-response.dto";

@Injectable({
  providedIn: 'root',
})
export class AliasClient extends AbstractClient{
  public isAliasRecipientAvailable(userId: string, domainId: string, recipient: string): Observable<AliasRecipientAvailabilityResponseDto> {
    return this.get(`/domain/${domainId}/recipient/${recipient}`).pipe(
      map((response: any) => {
        return this.serializerService.deserialize(response, AliasRecipientAvailabilityResponseDto)
      })
    );
  }

  public createMailboxAlias(
    userId: string,
    mailboxId: string,
    domainId: string,
    recipient: string
  ): Observable<AliasResponseDto> {
    return this.post(
      `/user/${userId}/mailbox/${mailboxId}/domain/${domainId}/alias`,
      {
        recipient: recipient
      }
    ).pipe(
      map((response: any) => {
        return this.serializerService.deserialize(response, AliasResponseDto)
      })
    );
  }

  public createContactAlias(
      userId: string,
      contactId: string,
      mailboxAliasId: string,
      recipient: string
  ): Observable<AliasResponseDto> {
    return this.post(
        `/user/${userId}/contact/${contactId}/mailbox/alias/${mailboxAliasId}/contact/alias`,
        {
          recipient: recipient
        }
    ).pipe(
        map((response: any) => {
          return this.serializerService.deserialize(response, AliasResponseDto)
        })
    );
  }

  public getMailboxAliasList(userId: string): Observable<AliasListResponseDto> {
    return this.get(`/user/${userId}/mailbox/alias`).pipe(
      map((response: any) => {
        return this.serializerService.deserialize(response, AliasListResponseDto)
      })
    );
  }

  public getContactAliasList(userId: string): Observable<AliasListResponseDto> {
    return this.get(`/user/${userId}/contact/alias`).pipe(
        map((response: any) => {
          return this.serializerService.deserialize(response, AliasListResponseDto)
        })
    );
  }

  public enableAlias(
    aliasId: string
  ): Observable<null> {
    return this.post(
      `/alias/${aliasId}/enable`,
      {}
    ).pipe(
      map(() => {
        return null;
      })
    );
  }

  public disableAlias(
    aliasId: string
  ): Observable<null> {
    return this.post(
      `/alias/${aliasId}/disable`,
      {}
    ).pipe(
      map(() => {
        return null;
      })
    );
  }

  public removeAlias(
    aliasId: string
  ): Observable<null> {
    return this.delete(
      `/alias/${aliasId}`,
    ).pipe(
      map(() => {
        return null;
      })
    );
  }
}

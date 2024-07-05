import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AbstractClient} from "./abstract.client";
import {MailboxAvailabilityResponseDto} from "../../dto/client/silvermail/mailbox/mailbox-availability-response.dto";
import {MailboxResponseDto} from "../../dto/client/silvermail/mailbox/mailbox-response.dto";
import {MailboxListResponseDto} from "../../dto/client/silvermail/mailbox/mailbox-list-response.dto";
import {BaseResponseDto} from "../../dto/client/silvermail/base-response.dto";

@Injectable({
  providedIn: 'root',
})
export class MailboxClient extends AbstractClient{
  public isMailboxAvailable(userId: string, email: string): Observable<MailboxAvailabilityResponseDto> {
    return this.get(`/user/${userId}/mailbox/${email}`).pipe(
      map((response: any) => {
        return this.serializerService.deserialize(response, MailboxAvailabilityResponseDto)
      })
    );
  }

  public createMailbox(
    userId: string,
    email: string
  ): Observable<MailboxResponseDto> {
    return this.post(
      `/user/${userId}/mailbox`,
      {
        email: email
      }
    ).pipe(
      map((response: any) => {
        return this.serializerService.deserialize(response, MailboxResponseDto)
      })
    );
  }

  public getMailboxList(userId: string): Observable<MailboxListResponseDto> {
    return this.get(`/user/${userId}/mailbox`).pipe(
      map((response: any) => {
        return this.serializerService.deserialize(response, MailboxListResponseDto)
      })
    );
  }

  public enableMailbox(
    mailboxId: string
  ): Observable<null> {
    return this.post(
      `/mailbox/${mailboxId}/enable`,
      {}
    ).pipe(
      map(() => {
        return null;
      })
    );
  }

  public disableMailbox(
    mailboxId: string
  ): Observable<null> {
    return this.post(
      `/mailbox/${mailboxId}/disable`,
      {}
    ).pipe(
      map(() => {
        return null;
      })
    );
  }

  public removeMailbox(
    mailboxId: string
  ): Observable<null> {
    return this.delete(
      `/mailbox/${mailboxId}`,
    ).pipe(
      map(() => {
        return null;
      })
    );
  }

  public sendMailboxEmailVerificationEmail(mailboxId: string): Observable<BaseResponseDto> {
    return this.post(
      `/mailbox/${mailboxId}/email/verification/send-email`,
      {}
    ).pipe(
      map((response: any) => {
        return this.serializerService.deserialize(response, BaseResponseDto)
      })
    );
  }

  public verifyMailboxEmail(token: string): Observable<BaseResponseDto> {
    return this.post(
      `/mailbox/email/verify`,
      {
        token: token
      }
    ).pipe(
      map((response: any) => {
        return this.serializerService.deserialize(response, BaseResponseDto)
      })
    );
  }

  public favoriteMailbox(
    mailboxId: string
  ): Observable<null> {
    return this.post(
      `/mailbox/${mailboxId}/favorite`,
      {}
    ).pipe(
      map(() => {
        return null;
      })
    );
  }
}

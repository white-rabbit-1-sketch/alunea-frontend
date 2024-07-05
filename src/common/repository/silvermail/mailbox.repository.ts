import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {MailboxClient} from "../../client/silvermail/mailbox.client";
import {MailboxMapper} from "./mapper/entity/mailbox.mapper";
import {MailboxAvailabilityResponseDto} from "../../dto/client/silvermail/mailbox/mailbox-availability-response.dto";
import {Mailbox} from "../../entitiy/mailbox.entity";
import {MailboxResponseDto} from "../../dto/client/silvermail/mailbox/mailbox-response.dto";
import {MailboxDto} from "../../dto/client/silvermail/mailbox/entity/mailbox.dto";
import {MailboxListResponseDto} from "../../dto/client/silvermail/mailbox/mailbox-list-response.dto";
import {BaseResponseDto} from "../../dto/client/silvermail/base-response.dto";

@Injectable({
  providedIn: 'root'
})
export class MailboxRepository {
  constructor(
    protected mailboxClient: MailboxClient,
    protected mailboxMapper: MailboxMapper
  ) {
  }

  public isMailboxAvailable(userId: string, email: string): Observable<boolean>
  {
    return this.mailboxClient.isMailboxAvailable(userId, email).pipe(
      map((mailboxAvailabilityResponseDto: MailboxAvailabilityResponseDto) => (mailboxAvailabilityResponseDto.getIsAvailable()))
    );
  }

  public createMailbox(userId: string, email: string): Observable<Mailbox>
  {
    return this.mailboxClient.createMailbox(userId, email).pipe(
      map((mailboxResponseDto: MailboxResponseDto) => {
        if (!mailboxResponseDto.getMailbox()) {
          throw new Error('Invalid mailbox');
        }

        return this.mailboxMapper.mapMailboxFromMailboxDto(
          mailboxResponseDto.getMailbox() as MailboxDto
        );
      })
    );
  }

  public getMailboxList(userId: string): Observable<Mailbox[]>
  {
    return this.mailboxClient.getMailboxList(userId).pipe(
      map((mailboxListResponseDto: MailboxListResponseDto) => {
        return this.mailboxMapper.mapMailboxListFromMailboxDtoList(
          mailboxListResponseDto.getMailboxList()
        );
      })
    );
  }

  public enableMailbox(mailboxId: string): Observable<null>
  {
    return this.mailboxClient.enableMailbox(mailboxId);
  }

  public disableMailbox(mailboxId: string): Observable<null>
  {
    return this.mailboxClient.disableMailbox(mailboxId);
  }

  public removeMailbox(mailboxId: string): Observable<null>
  {
    return this.mailboxClient.removeMailbox(mailboxId);
  }

  public sendMailboxEmailVerificationEmail(mailboxId: string): Observable<null> {
    return this.mailboxClient.sendMailboxEmailVerificationEmail(mailboxId).pipe(
      map((baseResponseDto: BaseResponseDto) => {
          if (!baseResponseDto.getResult()) {
            throw new Error('Request has failed');
          }

          return null;
        }
    ));
  }

  public verifyMailboxEmail(token: string): Observable<null> {
    return this.mailboxClient.verifyMailboxEmail(token).pipe(
      map((baseResponseDto: BaseResponseDto) => {
          if (!baseResponseDto.getResult()) {
            throw new Error('Request has failed');
          }

          return null;
        }
      ));
  }

  public favoriteMailbox(mailboxId: string): Observable<null>
  {
    return this.mailboxClient.favoriteMailbox(mailboxId);
  }
}

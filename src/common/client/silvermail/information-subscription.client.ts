import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AbstractClient} from "./abstract.client";
import {MailboxResponseDto} from "../../dto/client/silvermail/mailbox/mailbox-response.dto";
import {BaseResponseDto} from "../../dto/client/silvermail/base-response.dto";

@Injectable({
  providedIn: 'root',
})
export class InformationSubscriptionClient extends AbstractClient{
  public anonymousSubscribeOnGeneralNews(
    email: string,
    language: string
  ): Observable<MailboxResponseDto> {
    return this.post(
      `/information-subscription/general-news`,
      {
        email: email,
        language: language
      }
    ).pipe(
      map((response: any) => {
        return this.serializerService.deserialize(response, BaseResponseDto)
      })
    );
  }
}

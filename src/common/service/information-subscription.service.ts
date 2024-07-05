import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {InformationSubscriptionRepository} from "../repository/silvermail/information-subscription.repository";

@Injectable({
  providedIn: 'root',
})
export class InformationSubscriptionService {
  constructor(
    protected informationSubscriptionRepository: InformationSubscriptionRepository
  ) {
  }

  public anonymousSubscribeOnGeneralNews(email: string, language: string): Observable<null>
  {
    return this.informationSubscriptionRepository.anonymousSubscribeOnGeneralNews(email, language);
  }
}

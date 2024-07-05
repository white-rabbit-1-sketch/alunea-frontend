import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {InformationSubscriptionClient} from "../../client/silvermail/information-subscription.client";
import {BaseResponseDto} from "../../dto/client/silvermail/base-response.dto";

@Injectable({
  providedIn: 'root'
})
export class InformationSubscriptionRepository {
  constructor(
    protected informationSubscriptionClient: InformationSubscriptionClient
  ) {
  }

  public anonymousSubscribeOnGeneralNews(email: string, language: string): Observable<null>
  {
    return this.informationSubscriptionClient.anonymousSubscribeOnGeneralNews(email, language).pipe(
      map((baseResponseDto: BaseResponseDto) => {
        if (!baseResponseDto.getResult()) {
          throw new Error('Request has failed');
        }

        return null;
      })
    );
  }
}

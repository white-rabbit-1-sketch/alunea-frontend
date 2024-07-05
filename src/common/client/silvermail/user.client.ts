import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {UserEmailAvailabilityResponseDto} from "../../dto/client/silvermail/user/user-email-availability-response.dto";
import {AbstractClient} from "./abstract.client";
import {UserResponseDto} from "../../dto/client/silvermail/user/user-response.dto";
import {BaseResponseDto} from "../../dto/client/silvermail/base-response.dto";

@Injectable({
  providedIn: 'root',
})
export class UserClient extends AbstractClient {
  public isUserEmailAvailable(email: string): Observable<UserEmailAvailabilityResponseDto> {
    return this.get(`/user/email/${email}`).pipe(
      map((response: any) => {
        return this.serializerService.deserialize(response, UserEmailAvailabilityResponseDto)
      })
    );
  }

  public createUser(email: string, password: string, language: string): Observable<UserResponseDto> {
    return this.post(
      `/user`,
      {
        email: email,
        password: password,
        language: language
      }
    ).pipe(
      map((response: any) => {
        return this.serializerService.deserialize(response, UserResponseDto)
      })
    );
  }

  public updateUserEmail(userId: string, email: string): Observable<BaseResponseDto> {
    return this.post(
      `/user/${userId}/email`,
      {
        email: email
      }
    ).pipe(
      map((response: any) => {
        return this.serializerService.deserialize(response, BaseResponseDto)
      })
    );
  }

  public updateUserPassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Observable<BaseResponseDto> {
    return this.post(
      `/user/${userId}/password`,
      {
        currentPassword: currentPassword,
        newPassword: newPassword,
      }
    ).pipe(
      map((response: any) => {
        return this.serializerService.deserialize(response, BaseResponseDto)
      })
    );
  }

  public sendResetUserPasswordEmail(email: string): Observable<BaseResponseDto> {
    return this.post(
      `/user/password/reset/send-email`,
      {
        email: email
      }
    ).pipe(
      map((response: any) => {
        return this.serializerService.deserialize(response, BaseResponseDto)
      })
    );
  }

  public resetUserPassword(token: string, password: string): Observable<BaseResponseDto> {
    return this.post(
      `/user/password/reset`,
      {
        token: token,
        password: password,
      }
    ).pipe(
      map((response: any) => {
        return this.serializerService.deserialize(response, BaseResponseDto)
      })
    );
  }

  public getUserById(id: string): Observable<UserResponseDto> {
    return this.get(`/user/${id}`).pipe(
      map((response: any) => {
        return this.serializerService.deserialize(response, UserResponseDto)
      })
    );
  }

  public verifyUserEmail(token: string): Observable<BaseResponseDto> {
    return this.post(
      `/user/email/verify`,
      {
        token: token
      }
    ).pipe(
      map((response: any) => {
        return this.serializerService.deserialize(response, BaseResponseDto)
      })
    );
  }

  public sendUserVerificationEmail(userId: string): Observable<BaseResponseDto> {
    return this.post(
      `/user/${userId}/email/verification/send-email`,
      {}
    ).pipe(
      map((response: any) => {
        return this.serializerService.deserialize(response, BaseResponseDto)
      })
    );
  }

  public removeUser(userId: string): Observable<BaseResponseDto> {
    return this.delete(
      `/user/${userId}`,
    ).pipe(
      map((response: any) => {
        return this.serializerService.deserialize(response, BaseResponseDto)
      })
    );
  }

  public favoriteDomain(userId: string, domainId: string): Observable<BaseResponseDto> {
    return this.post(
      `/user/${userId}/domain/${domainId}/favorite`,
      {}
    ).pipe(
      map((response: any) => {
        return this.serializerService.deserialize(response, BaseResponseDto)
      })
    );
  }

  public favoriteMailbox(userId: string, mailboxId: string): Observable<BaseResponseDto> {
    return this.post(
      `/user/${userId}/mailbox/${mailboxId}/favorite`,
      {}
    ).pipe(
      map((response: any) => {
        return this.serializerService.deserialize(response, BaseResponseDto)
      })
    );
  }

    public updateUserLanguage(userId: string, language: string): Observable<BaseResponseDto> {
        return this.post(
            `/user/${userId}/language`,
            {
                language: language
            }
        ).pipe(
            map((response: any) => {
                return this.serializerService.deserialize(response, BaseResponseDto)
            })
        );
    }
}

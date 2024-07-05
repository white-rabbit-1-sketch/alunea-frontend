import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AbstractClient} from "./abstract.client";
import {AuthTokenResponseDto} from "../../dto/client/silvermail/security/auth-token-response.dto";

@Injectable({
  providedIn: 'root',
})
export class SecurityClient extends AbstractClient{
  public createUserAuthToken(email: string, password: string): Observable<AuthTokenResponseDto> {
    return this.post(
      `/security/user/auth-token`,
      {
        email: email,
        password: password
      }
    ).pipe(
      map((response: any) => {
        return this.serializerService.deserialize(response, AuthTokenResponseDto)
      })
    );
  }
}

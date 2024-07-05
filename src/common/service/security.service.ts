import { Injectable } from '@angular/core';
import {SecurityRepository as SilvermailSecurityRepository} from "../repository/silvermail/security.repository";
import {Token} from "../entitiy/token.entity";
import {SecurityRepository as LocalSecurityRepository} from "../repository/local/security.repository";
import {UserService} from "./user.service";
import {User} from "../entitiy/user.entity";
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {EventService} from "./event.service";

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  protected authenticatedUser: User | null = null;

  constructor(
    protected silvermailSecurityRepository: SilvermailSecurityRepository,
    protected localSecurityRepository: LocalSecurityRepository,
    protected userService: UserService,
    protected eventService: EventService
  ) {
  }

  public authenticateUser(email: string, password: string): Observable<Token> {
    return this.silvermailSecurityRepository.createUserAuthToken(email, password).pipe(
      map((token: Token) => {
        this.localSecurityRepository.saveToken(token);
        this.eventService.publishUserSigninEvent();

        return token
      })
    );
  }

  public deauthenticateUser(): void {
    this.authenticatedUser = null;
    this.localSecurityRepository.removeToken();
    this.eventService.publishUserSignoutEvent();
  }

  public getAuthenticatedUser(): Observable<User | null> {
    let result: Observable<User | null> = of(null);

    const token: Token | null = this.localSecurityRepository.getToken();

    if (token) {
      const expirationTime = new Date(token.getExp() as number * 1000);
      const currentTime = new Date();
      if (currentTime < expirationTime) {
        if (!this.authenticatedUser) {
          result = this.userService.getUserById(token.getSub() as string).pipe(
            map((user: User | null) => {
              this.authenticatedUser = user;

              return user;
            }),
            catchError((error) => {
              this.deauthenticateUser();
              throw error;
              return of(null);
            })
          );
        } else {
          result = of(this.authenticatedUser);
        }
      }
    }

    return result;
  }

  public getAuthenticatedUserToken(): Token | null {
    return this.localSecurityRepository.getToken();
  }
}

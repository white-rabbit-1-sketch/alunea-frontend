import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {UserRepository} from "../repository/silvermail/user.repository";
import {User} from "../entitiy/user.entity";
import {map} from "rxjs/operators";
import {AbstractDomain} from "../entitiy/domain/abstract-domain.entity";
import {Mailbox} from "../entitiy/mailbox.entity";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    protected userRepository: UserRepository
  ) {
  }

  public isUserEmailAvailable(email: string): Observable<boolean>
  {
    return this.userRepository.isUserEmailAvailable(email);
  }

  public createUser(email: string, password: string, language: string): Observable<User>
  {
    return this.userRepository.createUser(email, password, language);
  }

  public updateUserEmail(userId: string, email: string): Observable<null>
  {
    return this.userRepository.updateUserEmail(userId, email);
  }

  public updateUserPassword(
    user: User,
    currentPassword: string,
    newPassword: string
  ): Observable<null>
  {
    return this.userRepository.updateUserPassword(
      user.getId() as string,
      currentPassword,
      newPassword
    );
  }

  public getUserById(id: string): Observable<User | null>
  {
    return this.userRepository.getUserById(id);
  }

  public sendResetUserPasswordEmail(email: string): Observable<null>
  {
    return this.userRepository.sendResetUserPasswordEmail(email);
  }

  public resetUserPassword(token: string, password: string): Observable<null>
  {
    return this.userRepository.resetUserPassword(token, password);
  }

  public verifyUserEmail(token: string): Observable<null>
  {
    return this.userRepository.verifyUserEmail(token);
  }

  public sendUserVerificationEmail(userId: string): Observable<null>
  {
    return this.userRepository.sendUserVerificationEmail(userId);
  }

  public removeUser(userId: string): Observable<null>
  {
    return this.userRepository.removeUser(userId);
  }

  public favoriteDomain(user: User, domain: AbstractDomain): Observable<null>
  {
    return this.userRepository.favoriteDomain(
      user.getId() as string,
      domain.getId() as string
    ).pipe(map(() => {
      user.setFavoriteDomain(domain);

      return null;
    }));
  }

  public favoriteMailbox(user: User, mailbox: Mailbox): Observable<null>
  {
    return this.userRepository.favoriteMailbox(
      user.getId() as string,
      mailbox.getId() as string
    ).pipe(map(() => {
      user.setFavoriteMailbox(mailbox);

      return null;
    }));
  }

  public updateUserLanguage(user: User, language: string): Observable<null>
  {
    return this.userRepository.updateUserLanguage(
        user.getId() as string,
        language
    ).pipe(map(() => {
      user.setLanguage(language);

      return null;
    }));
  }
}

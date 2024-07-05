import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {UserClient} from "../../client/silvermail/user.client";
import {UserEmailAvailabilityResponseDto} from "../../dto/client/silvermail/user/user-email-availability-response.dto";
import {UserMapper} from "./mapper/entity/user.mapper";
import {Injectable} from "@angular/core";
import {User} from "../../entitiy/user.entity";
import {UserResponseDto} from "../../dto/client/silvermail/user/user-response.dto";
import {UserDto} from "../../dto/client/silvermail/user/entity/user.dto";
import {BaseResponseDto} from "../../dto/client/silvermail/base-response.dto";

@Injectable({
  providedIn: 'root'
})
export class UserRepository {
  constructor(
    protected userClient: UserClient,
    protected userMapper: UserMapper
  ) {
  }

  public isUserEmailAvailable(email: string): Observable<boolean> {
    return this.userClient.isUserEmailAvailable(email).pipe(
      map((userEmailAvailabilityResponseDto: UserEmailAvailabilityResponseDto) => (userEmailAvailabilityResponseDto.getIsAvailable()))
    );
  }

  public createUser(email: string, password: string, language: string): Observable<User> {
    return this.userClient.createUser(email, password, language).pipe(
      map((userResponseDto: UserResponseDto) => {
          if (!userResponseDto.getUser()) {
            throw new Error('Invalid user');
          }

          return this.userMapper.mapUserFromUserDto(
            userResponseDto.getUser() as UserDto
          )
        }
      ));
  }

  public updateUserEmail(userId: string, email: string): Observable<null> {
    return this.userClient.updateUserEmail(userId, email).pipe(
      map((baseResponseDto: BaseResponseDto) => {
          if (!baseResponseDto.getResult()) {
            throw new Error('Request has failed');
          }

          return null;
        }
      ));
  }

  public updateUserPassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ): Observable<null> {
    return this.userClient.updateUserPassword(userId, currentPassword, newPassword).pipe(
      map((baseResponseDto: BaseResponseDto) => {
          if (!baseResponseDto.getResult()) {
            throw new Error('Request has failed');
          }

          return null;
        }
      ));
  }

  public getUserById(id: string): Observable<User | null> {
    return this.userClient.getUserById(id).pipe(
      map((userResponseDto: UserResponseDto) => {
          let user: User | null = null;

          if (userResponseDto.getUser()) {
            user = this.userMapper.mapUserFromUserDto(
              userResponseDto.getUser() as UserDto
            );
          }

          return user;
        }
      )
    );
  }

  public sendResetUserPasswordEmail(email: string): Observable<null> {
    return this.userClient.sendResetUserPasswordEmail(email).pipe(
      map((baseResponseDto: BaseResponseDto) => {
          if (!baseResponseDto.getResult()) {
            throw new Error('Request has failed');
          }

          return null;
        }
      ));
  }

  public resetUserPassword(token: string, password: string): Observable<null> {
    return this.userClient.resetUserPassword(token, password).pipe(
      map((baseResponseDto: BaseResponseDto) => {
          if (!baseResponseDto.getResult()) {
            throw new Error('Request has failed');
          }

          return null;
        }
      ));
  }

  public verifyUserEmail(token: string): Observable<null> {
    return this.userClient.verifyUserEmail(token).pipe(
      map((baseResponseDto: BaseResponseDto) => {
          if (!baseResponseDto.getResult()) {
            throw new Error('Request has failed');
          }

          return null;
        }
      ));
  }

  public sendUserVerificationEmail(userId: string): Observable<null> {
    return this.userClient.sendUserVerificationEmail(userId).pipe(
      map((baseResponseDto: BaseResponseDto) => {
          if (!baseResponseDto.getResult()) {
            throw new Error('Request has failed');
          }

          return null;
        }
      ));
  }

  public removeUser(userId: string): Observable<null> {
    return this.userClient.removeUser(userId).pipe(
      map((baseResponseDto: BaseResponseDto) => {
          if (!baseResponseDto.getResult()) {
            throw new Error('Request has failed');
          }

          return null;
        }
      ));
  }

  public favoriteDomain(userId: string, domainId: string): Observable<null> {
    return this.userClient.favoriteDomain(userId, domainId).pipe(
      map((baseResponseDto: BaseResponseDto) => {
          if (!baseResponseDto.getResult()) {
            throw new Error('Request has failed');
          }

          return null;
        }
      ));
  }

  public favoriteMailbox(userId: string, mailboxId: string): Observable<null> {
    return this.userClient.favoriteMailbox(userId, mailboxId).pipe(
      map((baseResponseDto: BaseResponseDto) => {
          if (!baseResponseDto.getResult()) {
            throw new Error('Request has failed');
          }

          return null;
        }
      ));
  }

    public updateUserLanguage(userId: string, language: string): Observable<null> {
        return this.userClient.updateUserLanguage(userId, language).pipe(
            map((baseResponseDto: BaseResponseDto) => {
                    if (!baseResponseDto.getResult()) {
                        throw new Error('Request has failed');
                    }

                    return null;
                }
            ));
    }
}

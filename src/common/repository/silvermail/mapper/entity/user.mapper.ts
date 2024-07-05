import {Injectable} from '@angular/core';
import {UserDto} from "../../../../dto/client/silvermail/user/entity/user.dto";
import {User} from "../../../../entitiy/user.entity";
import {AbstractDomainDto} from "../../../../dto/client/silvermail/domain/entity/abstract-domain.dto";
import {UniversalDomainMapper} from "./domain/universal-domain.mapper";
import {MailboxMapper} from "./mailbox.mapper";
import {MailboxDto} from "../../../../dto/client/silvermail/mailbox/entity/mailbox.dto";

@Injectable({
  providedIn: 'root'
})
export class UserMapper {
  constructor(
    protected universalDomainMapper: UniversalDomainMapper,
    protected mailboxMapper: MailboxMapper
  ) {
  }

  public mapUserFromUserDto(
    userDto: UserDto
  ): User {
    const user = new User();
    user.setId(userDto.getId());
    user.setEmail(userDto.getEmail());
    user.setIsEmailVerified(userDto.getIsEmailVerified());
    if (userDto.getFavoriteDomain() !== null) {
      user.setFavoriteDomain(this.universalDomainMapper.mapDomainFromDomainDto(
          userDto.getFavoriteDomain() as AbstractDomainDto
      ));
    }
    if (userDto.getFavoriteMailbox() !== null) {
      user.setFavoriteMailbox(this.mailboxMapper.mapMailboxFromMailboxDto(
          userDto.getFavoriteMailbox() as MailboxDto
      ));
    }
    user.setLanguage(userDto.getLanguage());

    return user;
  }

  public mapUserDtoFromUser(
    user: User
  ): UserDto {
    const userDto = new UserDto();
    userDto.setId(user.getId());
    userDto.setEmail(user.getEmail());

    return userDto;
  }
}

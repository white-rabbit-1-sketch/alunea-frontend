import {Injectable} from '@angular/core';
import {UserMapper} from "../../../repository/silvermail/mapper/entity/user.mapper";
import {User} from "../../../entitiy/user.entity";

@Injectable({
  providedIn: 'root'
})
export class UserCloner {
  constructor(
    protected userMapper: UserMapper
  ) {
  }

  public cloneUser(user: User): User {
    const userDto = this.userMapper.mapUserDtoFromUser(user);

    return this.userMapper.mapUserFromUserDto(userDto);
  }
}

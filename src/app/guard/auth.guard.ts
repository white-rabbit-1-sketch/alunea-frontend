import {CanActivateFn} from '@angular/router';
import {User} from "../../common/entitiy/user.entity";
import {SecurityService} from "../../common/service/security.service";
import {inject} from "@angular/core";
import {map} from "rxjs/operators";

export const authGuard: CanActivateFn = () => {
  const securityService: SecurityService = inject(SecurityService);

  return securityService.getAuthenticatedUser().pipe(
    map((user: User | null) => {
      return !!user;
    })
  );
};

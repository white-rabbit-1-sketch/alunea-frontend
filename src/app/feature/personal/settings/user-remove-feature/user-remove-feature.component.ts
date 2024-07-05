import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {SecurityService} from "../../../../../common/service/security.service";
import {UserService} from "../../../../../common/service/user.service";
import {FlashMessageService} from "../../../../../common/service/flash-message.service";
import {of, switchMap} from "rxjs";
import {User} from "../../../../../common/entitiy/user.entity";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {UserRemoveDialogComponent} from "./user-remove-dialog/user-remove-dialog.component";

@Component({
  selector: 'app-user-remove-feature',
  standalone: true,
    imports: [
        MatButton,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule
    ],
  templateUrl: './user-remove-feature.component.html',
  styleUrl: './user-remove-feature.component.scss'
})
export class UserRemoveFeatureComponent {
  constructor(
    protected securityService: SecurityService,
    protected userService: UserService,
    protected flashMessageService: FlashMessageService,
    protected router: Router,
    protected dialog: MatDialog
  ) {}

  protected onUserRemove(): void {
    const dialogRef = this.dialog.open(UserRemoveDialogComponent);

    dialogRef.afterClosed().pipe(
      switchMap((result) => {
        return result ? this.securityService.getAuthenticatedUser().pipe(
          switchMap((user: User | null) => {
            return user ? this.userService.removeUser(
              user.getId() as string
            ) : of();
          })
        ) : of();
      })
    ).subscribe({
      next: () => {
        this.securityService.deauthenticateUser();
        this.flashMessageService.showSuccessMessage($localize `The account has been successfully removed`);
        this.router.navigate(['/']);
      }
    });
  }
}

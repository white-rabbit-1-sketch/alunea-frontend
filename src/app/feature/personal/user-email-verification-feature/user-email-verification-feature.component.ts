import {Component, OnInit} from '@angular/core';
import {FlashMessageService} from "../../../../common/service/flash-message.service";
import {Router} from "@angular/router";
import {UserService} from "../../../../common/service/user.service";
import {User} from "../../../../common/entitiy/user.entity";
import {SecurityService} from "../../../../common/service/security.service";
import {finalize, switchMap} from "rxjs/operators";
import {MatAnchor, MatButton} from "@angular/material/button";
import {of} from "rxjs";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-user-email-verification-feature',
  standalone: true,
  imports: [
    MatButton,
    MatAnchor,
    NgIf
  ],
  templateUrl: './user-email-verification-feature.component.html',
  styleUrl: './user-email-verification-feature.component.scss'
})
export class UserEmailVerificationFeatureComponent implements OnInit {
  protected isEmailVerificationRequired: boolean = false;
  protected isResendButtonDisabled = false;

  constructor(
    protected router: Router,
    protected flashMessageService: FlashMessageService,
    protected securityService: SecurityService,
    protected userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.securityService.getAuthenticatedUser().subscribe({
      next: (user: User | null) => {
        if (user) {
          this.isEmailVerificationRequired = user && !user.getIsEmailVerified();
        }
      }
    });
  }

  resendVerificationEmail() {
    this.isResendButtonDisabled = true;
    this.securityService.getAuthenticatedUser().pipe(
      switchMap((user: User | null) => {
        return user ? this.userService.sendUserVerificationEmail(user.getId() as string).pipe(
          finalize(() => {
            this.isResendButtonDisabled = false;
          }
        )) : of() ;
      })
    ).subscribe({
      next: () => {
        this.flashMessageService.showSuccessMessage($localize `The verification email has been successfully sent`);
      }
    });
  }
}



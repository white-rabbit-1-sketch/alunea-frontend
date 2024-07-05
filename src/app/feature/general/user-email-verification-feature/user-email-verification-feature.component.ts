import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FlashMessageService} from "../../../../common/service/flash-message.service";
import {UserService} from "../../../../common/service/user.service";
import {SecurityService} from "../../../../common/service/security.service";
import {User} from "../../../../common/entitiy/user.entity";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-user-email-verification-feature',
  standalone: true,
  imports: [],
  templateUrl: './user-email-verification-feature.component.html',
  styleUrl: './user-email-verification-feature.component.scss'
})
export class UserEmailVerificationFeatureComponent implements OnInit {
  protected emailVerificationToken: string | null = null;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected flashMessageService: FlashMessageService,
    protected userService: UserService,
    protected securityService: SecurityService,
  ) {
  }

  ngOnInit(): void {
    this.emailVerificationToken = this.activatedRoute.snapshot.queryParamMap.get('user-email-verification-token');
    if (!this.emailVerificationToken) {
      this.router.navigate(['/']);
    }

    this.userService.verifyUserEmail(this.emailVerificationToken as string).pipe(
      finalize(() => {
        this.securityService.getAuthenticatedUser().subscribe({
          next: (user: User | null) => {
            if (user) {
              this.router.navigate(['/personal/aliases']);
            } else {
              this.router.navigate(['/']);
            }
          }
        });
      })
    ).subscribe({
      next: () => {
        this.flashMessageService.showSuccessMessage($localize `The email has been successfully verified`);
      }
    });
  }
}

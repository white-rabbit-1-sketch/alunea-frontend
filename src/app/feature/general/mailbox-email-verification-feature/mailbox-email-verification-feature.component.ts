import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FlashMessageService} from "../../../../common/service/flash-message.service";
import {SecurityService} from "../../../../common/service/security.service";
import {User} from "../../../../common/entitiy/user.entity";
import {finalize} from "rxjs/operators";
import {MailboxService} from "../../../../common/service/mailbox.service";

@Component({
  selector: 'app-mailbox-email-verification-feature',
  standalone: true,
  imports: [],
  templateUrl: './mailbox-email-verification-feature.component.html',
  styleUrl: './mailbox-email-verification-feature.component.scss'
})
export class MailboxEmailVerificationFeatureComponent implements OnInit{
  protected mailboxEmailVerificationToken: string | null = null;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected flashMessageService: FlashMessageService,
    protected mailboxService: MailboxService,
    protected securityService: SecurityService,
  ) {
  }

  ngOnInit(): void {
    this.mailboxEmailVerificationToken = this.activatedRoute.snapshot.queryParamMap.get('mailbox-email-verification-token');
    if (!this.mailboxEmailVerificationToken) {
      this.router.navigate(['/']);
    }

    this.mailboxService.verifyMailboxEmail(this.mailboxEmailVerificationToken as string).pipe(
      finalize(() => {
        this.securityService.getAuthenticatedUser().subscribe({
          next: (user: User | null) => {
            if (user) {
              this.router.navigate(['/personal/mailboxes']);
            } else {
              this.router.navigate(['/']);
            }
          }
        });
      })
    ).subscribe({
      next: () => {
        this.flashMessageService.showSuccessMessage($localize `The mailbox has been successfully verified`);
      }
    });
  }
}

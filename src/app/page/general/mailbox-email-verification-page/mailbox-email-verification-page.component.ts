import { Component } from '@angular/core';
import {
  MailboxEmailVerificationFeatureComponent
} from "../../../feature/general/mailbox-email-verification-feature/mailbox-email-verification-feature.component";

@Component({
  selector: 'app-mailbox-email-verification-page',
  standalone: true,
  imports: [
    MailboxEmailVerificationFeatureComponent
  ],
  templateUrl: './mailbox-email-verification-page.component.html',
  styleUrl: './mailbox-email-verification-page.component.scss'
})
export class MailboxEmailVerificationPageComponent {

}

import { Component } from '@angular/core';
import {
  UserEmailVerificationFeatureComponent
} from "../../../feature/general/user-email-verification-feature/user-email-verification-feature.component";

@Component({
  selector: 'app-user-email-verification-page',
  standalone: true,
  imports: [
    UserEmailVerificationFeatureComponent
  ],
  templateUrl: './user-email-verification-page.component.html',
  styleUrl: './user-email-verification-page.component.scss'
})
export class UserEmailVerificationPageComponent {

}

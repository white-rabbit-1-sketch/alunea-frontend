import { Component } from '@angular/core';
import {
  UserPasswordResetFeatureComponent
} from "../../../feature/general/user-password-reset-feature/user-password-reset-feature.component";
import {LogoComponent} from "../../../layout/base-layout/logo/logo.component";
import {SigninFeatureComponent} from "../../../feature/general/signin-feature/signin-feature.component";

@Component({
  selector: 'app-user-password-reset-page',
  standalone: true,
    imports: [
        UserPasswordResetFeatureComponent,
        LogoComponent,
        SigninFeatureComponent
    ],
  templateUrl: './user-password-reset-page.component.html',
  styleUrl: './user-password-reset-page.component.scss'
})
export class UserPasswordResetPageComponent {

}

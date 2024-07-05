import { Component } from '@angular/core';
import {SignupFeatureComponent} from "../../../feature/general/signup-feature/signup-feature.component";
import {LogoComponent} from "../../../layout/base-layout/logo/logo.component";
import {SigninFeatureComponent} from "../../../feature/general/signin-feature/signin-feature.component";

@Component({
  selector: 'app-signup-page',
  standalone: true,
    imports: [
        SignupFeatureComponent,
        LogoComponent,
        SigninFeatureComponent
    ],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent {

}

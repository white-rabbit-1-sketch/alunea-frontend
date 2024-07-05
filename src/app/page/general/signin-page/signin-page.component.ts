import { Component } from '@angular/core';
import {SigninFeatureComponent} from "../../../feature/general/signin-feature/signin-feature.component";
import {LogoComponent} from "../../../layout/base-layout/logo/logo.component";

@Component({
  selector: 'app-signin-page',
  standalone: true,
    imports: [
        SigninFeatureComponent,
        LogoComponent
    ],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.scss'
})
export class SigninPageComponent {

}

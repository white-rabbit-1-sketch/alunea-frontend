import { Component } from '@angular/core';
import {BaseFooterComponent} from "../base-layout/base-footer/base-footer.component";
import {GeneralHeaderComponent} from "../general-layout/general-header/general-header.component";
import {RouterOutlet} from "@angular/router";
import {PersonalHeaderComponent} from "./personal-header/personal-header.component";
import {
  UserEmailVerificationFeatureComponent
} from "../../feature/personal/user-email-verification-feature/user-email-verification-feature.component";

@Component({
  selector: 'app-personal-layout',
  standalone: true,
  imports: [
    BaseFooterComponent,
    GeneralHeaderComponent,
    RouterOutlet,
    PersonalHeaderComponent,
    UserEmailVerificationFeatureComponent
  ],
  templateUrl: './personal-layout.component.html',
  styleUrl: './personal-layout.component.scss'
})
export class PersonalLayoutComponent {

}

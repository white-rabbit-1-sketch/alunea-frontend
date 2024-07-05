import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  UserEmailVerificationFeatureComponent
} from "./feature/personal/user-email-verification-feature/user-email-verification-feature.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserEmailVerificationFeatureComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

}

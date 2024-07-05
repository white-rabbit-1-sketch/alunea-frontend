import { Component } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {SecurityService} from "../../../../common/service/security.service";
import {Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {DeviceService} from "../../../../common/service/device.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-signout-feature',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatIconButton,
    NgIf
  ],
  templateUrl: './signout-feature.component.html',
  styleUrl: './signout-feature.component.scss'
})
export class SignoutFeatureComponent {
  constructor(
    protected securityService: SecurityService,
    protected router: Router,
    protected deviceService: DeviceService
  ) {
  }

  protected signout(): void {
    this.securityService.deauthenticateUser();
    this.router.navigate(['/']);
  }
}

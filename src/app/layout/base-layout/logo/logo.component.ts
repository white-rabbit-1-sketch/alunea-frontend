import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {RouterService} from "../../../../common/service/router.service";

@Component({
  selector: 'app-logo',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
  constructor(
    protected routerService: RouterService
  ) {
  }
}

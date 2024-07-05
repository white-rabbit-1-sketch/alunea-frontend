import { Component } from '@angular/core';
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {TariffFeatureComponent} from "../../../feature/general/tariff-feature/tariff-feature.component";
import {MatExpansionModule} from '@angular/material/expansion';
import {
  EmailSubscriptionFeatureComponent
} from "../../../feature/general/email-subscription-feature/email-subscription-feature.component";
import {RouterLink} from "@angular/router";
import {RouterService} from "../../../../common/service/router.service";

@Component({
  selector: 'app-index-page',
  standalone: true,
    imports: [
        MatButton,
        MatIcon,
        MatIconButton,
        TariffFeatureComponent,
        MatExpansionModule,
        EmailSubscriptionFeatureComponent,
        RouterLink,
        MatAnchor
    ],
  templateUrl: './index-page.component.html',
  styleUrl: './index-page.component.scss'
})
export class IndexPageComponent {
  constructor(
    protected routerService: RouterService
  ) {
  }

  onNotifyMeClick = () => {
    this.routerService.redirectAndScroll('/', 'information-subscription');
  }
}

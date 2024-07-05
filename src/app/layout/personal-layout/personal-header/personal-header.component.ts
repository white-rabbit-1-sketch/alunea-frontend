import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {LogoComponent} from "../../base-layout/logo/logo.component";
import {MatButton} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbar} from "@angular/material/toolbar";
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {SignoutFeatureComponent} from "../../../feature/general/signout-feature/signout-feature.component";
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import {
  ThemeManagerFeatureComponent
} from "../../../feature/general/theme-manager-feature/theme-manager-feature.component";
import {
    LanguageSelectorFeatureComponent
} from "../../../feature/general/language-selector-feature/language-selector-feature.component";
import {RouterService} from "../../../../common/service/router.service";
import {DeviceService} from "../../../../common/service/device.service";

@Component({
  selector: 'app-personal-header',
  standalone: true,
    imports: [
        LogoComponent,
        MatButton,
        CommonModule,
        MatSidenavModule,
        MatToolbar,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        RouterLink,
        SignoutFeatureComponent,
        MatBadgeModule,
        MatMenuModule,
        ThemeManagerFeatureComponent,
        RouterLinkActive,
        LanguageSelectorFeatureComponent
    ],
  templateUrl: './personal-header.component.html',
  styleUrl: './personal-header.component.scss'
})
export class PersonalHeaderComponent {
  @ViewChild('snav') sidenav!: MatSidenav;

  constructor(
    protected router: Router,
    protected el: ElementRef,
    protected deviceService: DeviceService
  ) {
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = this.el.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.sidenav.close();
    }
  }

  navigateAndClose(route: string): void {
    this.router.navigate([route]);
    this.sidenav.close();
  }
}

import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {ThemeService} from "../../../../common/service/theme.service";

@Component({
  selector: 'app-theme-manager-feature',
  standalone: true,
    imports: [
        MatIcon,
        MatIconButton
    ],
  templateUrl: './theme-manager-feature.component.html',
  styleUrl: './theme-manager-feature.component.scss'
})
export class ThemeManagerFeatureComponent implements OnInit {
  constructor(
    protected themeService: ThemeService
  ) {
  }

  ngOnInit(): void {
    this.themeService.initTheme();
  }

  public onChangeTheme(): void {
    this.themeService.changeTheme();
  }
}

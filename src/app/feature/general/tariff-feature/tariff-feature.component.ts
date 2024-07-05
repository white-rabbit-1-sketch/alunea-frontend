import { Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-tariff-feature',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatListModule,
    RouterLink,
    NgIf,
    MatIconModule,
    MatBadgeModule,
    MatTooltip
  ],
  templateUrl: './tariff-feature.component.html',
  styleUrl: './tariff-feature.component.scss'
})
export class TariffFeatureComponent {
  @Input() notifyMeCallback!: () => void;
}

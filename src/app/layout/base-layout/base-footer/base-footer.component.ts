import { Component } from '@angular/core';
import {LogoComponent} from "../logo/logo.component";
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatToolbar} from "@angular/material/toolbar";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-base-footer',
  standalone: true,
  imports: [
    LogoComponent,
    MatButton,
    MatNavList,
    MatToolbar,
    NgIf,
    MatListItem,
    RouterLink,
    MatAnchor
  ],
  templateUrl: './base-footer.component.html',
  styleUrl: './base-footer.component.scss'
})
export class BaseFooterComponent {

}

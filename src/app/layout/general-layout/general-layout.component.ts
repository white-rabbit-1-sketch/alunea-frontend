import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {GeneralHeaderComponent} from "./general-header/general-header.component";
import {BaseFooterComponent} from "../base-layout/base-footer/base-footer.component";

@Component({
  selector: 'app-general-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    GeneralHeaderComponent,
    BaseFooterComponent
  ],
  templateUrl: './general-layout.component.html',
  styleUrl: './general-layout.component.scss'
})
export class GeneralLayoutComponent {

}

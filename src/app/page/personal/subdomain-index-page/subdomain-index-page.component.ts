import { Component } from '@angular/core';
import {
  SubdomainListFeatureComponent
} from "../../../feature/personal/subdomain-list-feature/subdomain-list-feature.component";
import {MatButton} from "@angular/material/button";
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from "@angular/material/expansion";
import {
  SubdomainAddFeatureComponent
} from "../../../feature/personal/subdomain-add-feature/subdomain-add-feature.component";

@Component({
  selector: 'app-subdomain-index-page',
  standalone: true,
  imports: [
    SubdomainListFeatureComponent,
    MatButton,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    SubdomainAddFeatureComponent
  ],
  templateUrl: './subdomain-index-page.component.html',
  styleUrl: './subdomain-index-page.component.scss'
})
export class SubdomainIndexPageComponent {

}

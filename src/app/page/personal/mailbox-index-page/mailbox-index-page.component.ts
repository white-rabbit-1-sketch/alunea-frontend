import { Component } from '@angular/core';
import {
  MailboxListFeatureComponent
} from "../../../feature/personal/mailbox-list-feature/mailbox-list-feature.component";
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from "@angular/material/expansion";
import {
    SubdomainAddFeatureComponent
} from "../../../feature/personal/subdomain-add-feature/subdomain-add-feature.component";
import {
    SubdomainListFeatureComponent
} from "../../../feature/personal/subdomain-list-feature/subdomain-list-feature.component";
import {MailboxAddFeatureComponent} from "../../../feature/personal/mailbox-add-feature/mailbox-add-feature.component";

@Component({
  selector: 'app-mailbox-index-page',
  standalone: true,
  imports: [
    MailboxListFeatureComponent,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    SubdomainAddFeatureComponent,
    SubdomainListFeatureComponent,
    MailboxAddFeatureComponent
  ],
  templateUrl: './mailbox-index-page.component.html',
  styleUrl: './mailbox-index-page.component.scss'
})
export class MailboxIndexPageComponent {

}

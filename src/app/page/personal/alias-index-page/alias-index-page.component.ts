import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
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
import {MailboxAliasListFeatureComponent} from "../../../feature/personal/mailbox-alias-list-feature/mailbox-alias-list-feature.component";
import {MailboxAliasAddFeatureComponent} from "../../../feature/personal/mailbox-alias-add-feature/mailbox-alias-add-feature.component";
import {
    ContactAliasListFeatureComponent
} from "../../../feature/personal/contact-alias-list-feature/contact-alias-list-feature.component";
import {
    ContactAliasAddFeatureComponent
} from "../../../feature/personal/contact-alias-add-feature/contact-alias-add-feature.component";

@Component({
  selector: 'app-alias-index-page',
  standalone: true,
    imports: [
        MatAccordion,
        MatExpansionPanel,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle,
        SubdomainAddFeatureComponent,
        SubdomainListFeatureComponent,
        MailboxAliasListFeatureComponent,
        MailboxAliasAddFeatureComponent,
        MatTabsModule,
        ContactAliasListFeatureComponent,
        ContactAliasAddFeatureComponent
    ],
  templateUrl: './alias-index-page.component.html',
  styleUrl: './alias-index-page.component.scss'
})
export class AliasIndexPageComponent {

}

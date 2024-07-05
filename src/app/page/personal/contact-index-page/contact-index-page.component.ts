import { Component } from '@angular/core';
import {MailboxAliasAddFeatureComponent} from "../../../feature/personal/mailbox-alias-add-feature/mailbox-alias-add-feature.component";
import {MailboxAliasListFeatureComponent} from "../../../feature/personal/mailbox-alias-list-feature/mailbox-alias-list-feature.component";
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from "@angular/material/expansion";
import {
    ContactListFeatureComponent
} from "../../../feature/personal/contact-list-feature/contact-list-feature.component";
import {ContactAddFeatureComponent} from "../../../feature/personal/contact-add-feature/contact-add-feature.component";

@Component({
  selector: 'app-contact-index-page',
  standalone: true,
    imports: [
        MailboxAliasAddFeatureComponent,
        MailboxAliasListFeatureComponent,
        MatAccordion,
        MatExpansionPanel,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle,
        ContactListFeatureComponent,
        ContactAddFeatureComponent
    ],
  templateUrl: './contact-index-page.component.html',
  styleUrl: './contact-index-page.component.scss'
})
export class ContactIndexPageComponent {

}

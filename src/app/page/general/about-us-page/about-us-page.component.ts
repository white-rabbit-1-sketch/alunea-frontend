import { Component } from '@angular/core';
import {MailboxAliasAddFeatureComponent} from "../../../feature/personal/mailbox-alias-add-feature/mailbox-alias-add-feature.component";
import {MailboxAliasListFeatureComponent} from "../../../feature/personal/mailbox-alias-list-feature/mailbox-alias-list-feature.component";
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from "@angular/material/expansion";

@Component({
  selector: 'app-about-us-page',
  standalone: true,
    imports: [
        MailboxAliasAddFeatureComponent,
        MailboxAliasListFeatureComponent,
        MatAccordion,
        MatExpansionPanel,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle
    ],
  templateUrl: './about-us-page.component.html',
  styleUrl: './about-us-page.component.scss'
})
export class AboutUsPageComponent {

}

import { Component } from '@angular/core';
import {
  UserEmailChangeFeatureComponent
} from "../../../feature/personal/settings/user-email-change-feature/user-email-change-feature.component";
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from "@angular/material/expansion";
import {
  UserPasswordChangeFeatureComponent
} from "../../../feature/personal/settings/user-password-change-feature/user-password-change-feature.component";
import {
  UserRemoveFeatureComponent
} from "../../../feature/personal/settings/user-remove-feature/user-remove-feature.component";
import {
  UserFavoriteDomainFeatureComponent
} from "../../../feature/personal/settings/user-favorite-domain-feature/user-favorite-domain-feature.component";
import {
  UserFavoriteMailboxFeatureComponent
} from "../../../feature/personal/settings/user-favorite-mailbox-feature/user-favorite-mailbox-feature.component";
import {
    UserLanguageFeatureComponent
} from "../../../feature/personal/settings/user-language-feature/user-language-feature.component";

@Component({
  selector: 'app-settings-index-page',
  standalone: true,
    imports: [
        UserEmailChangeFeatureComponent,
        MatAccordion,
        MatExpansionPanel,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle,
        UserPasswordChangeFeatureComponent,
        UserRemoveFeatureComponent,
        UserFavoriteDomainFeatureComponent,
        UserFavoriteMailboxFeatureComponent,
        UserLanguageFeatureComponent
    ],
  templateUrl: './settings-index-page.component.html',
  styleUrl: './settings-index-page.component.scss'
})
export class SettingsIndexPageComponent {

}

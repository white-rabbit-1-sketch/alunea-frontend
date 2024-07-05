import { Routes } from '@angular/router';
import { BaseLayoutComponent } from "./layout/base-layout/base-layout.component";
import { GeneralLayoutComponent } from "./layout/general-layout/general-layout.component";
import {IndexPageComponent} from "./page/general/index-page/index-page.component";
import {SignupPageComponent} from "./page/general/signup-page/signup-page.component";
import {SigninPageComponent} from "./page/general/signin-page/signin-page.component";
import {MailboxIndexPageComponent} from "./page/personal/mailbox-index-page/mailbox-index-page.component";
import {AliasIndexPageComponent} from "./page/personal/alias-index-page/alias-index-page.component";
import {
  SubdomainIndexPageComponent
} from "./page/personal/subdomain-index-page/subdomain-index-page.component";
import {SettingsIndexPageComponent} from "./page/personal/settings-index-page/settings-index-page.component";
import {UserPasswordResetPageComponent} from "./page/general/user-password-reset-page/user-password-reset-page.component";
import {AboutUsPageComponent} from "./page/general/about-us-page/about-us-page.component";
import {TermsPageComponent} from "./page/general/terms-page/terms-page.component";
import {ContactsPageComponent} from "./page/general/contacts-page/contacts-page.component";
import {authGuard} from "./guard/auth.guard";
import {UserEmailVerificationPageComponent} from "./page/general/user-email-verification-page/user-email-verification-page.component";
import {PersonalLayoutComponent} from "./layout/personal-layout/personal-layout.component";
import {
  MailboxEmailVerificationPageComponent
} from "./page/general/mailbox-email-verification-page/mailbox-email-verification-page.component";
import {NotFoundPageComponent} from "./page/general/not-found-page/not-found-page.component";
import {FeatureRequestPageComponent} from "./page/personal/feature-request-page/feature-request-page.component";
import {ContactIndexPageComponent} from "./page/personal/contact-index-page/contact-index-page.component";


export const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: GeneralLayoutComponent,
        children: [
          { path: '', component: IndexPageComponent },
          { path: 'signin', component: SigninPageComponent },
          { path: 'signup', component: SignupPageComponent },
          { path: 'user-password-reset', component: UserPasswordResetPageComponent },
          { path: 'user-email-verification', component: UserEmailVerificationPageComponent },
          { path: 'mailbox-email-verification', component: MailboxEmailVerificationPageComponent },
          { path: 'about-us', component: AboutUsPageComponent },
          { path: 'terms', component: TermsPageComponent },
          { path: 'contacts', component: ContactsPageComponent },
        ]
      },
      {
        path: '',
        component: PersonalLayoutComponent,
        children: [
          { path: 'personal/aliases', component: AliasIndexPageComponent, canActivate: [authGuard] },
          { path: 'personal/mailboxes', component: MailboxIndexPageComponent, canActivate: [authGuard] },
          { path: 'personal/subdomains', component: SubdomainIndexPageComponent, canActivate: [authGuard] },
          { path: 'personal/contacts', component: ContactIndexPageComponent, canActivate: [authGuard] },
          { path: 'personal/settings', component: SettingsIndexPageComponent, canActivate: [authGuard] },
          { path: 'personal/feature-request', component: FeatureRequestPageComponent, canActivate: [authGuard] },
        ]
      },
      {
        path: '',
        component: GeneralLayoutComponent,
        children: [
          { path: '**', pathMatch: 'full', component: NotFoundPageComponent },
        ]
      },
    ]
  }
];

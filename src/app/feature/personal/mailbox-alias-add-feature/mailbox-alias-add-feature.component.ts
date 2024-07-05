import {Component, OnInit} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatError, MatOption, MatSelect} from "@angular/material/select";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {AbstractDomain} from "../../../../common/entitiy/domain/abstract-domain.entity";
import {FlashMessageService} from "../../../../common/service/flash-message.service";
import {Observable, of, switchMap} from "rxjs";
import {finalize, map} from "rxjs/operators";
import {AliasService} from "../../../../common/service/alias.service";
import {Mailbox} from "../../../../common/entitiy/mailbox.entity";
import {MailboxService} from "../../../../common/service/mailbox.service";
import {User} from "../../../../common/entitiy/user.entity";
import {SecurityService} from "../../../../common/service/security.service";
import {DomainService} from "../../../../common/service/domain.service";
import {Contact} from "../../../../common/entitiy/contact.entity";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-mailbox-alias-add-feature',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatSelect,
    MatButton,
    MatOption,
    MatLabel,
    MatError,
    MatIcon,
    MatIconButton,
    NgIf
  ],
  templateUrl: './mailbox-alias-add-feature.component.html',
  styleUrl: './mailbox-alias-add-feature.component.scss'
})
export class MailboxAliasAddFeatureComponent implements OnInit {
  protected aliasForm!: FormGroup;
  protected recipientFormControl!: FormControl;
  protected domainFormControl!: FormControl;
  protected mailboxFormControl!: FormControl;
  protected domainList: AbstractDomain[] = [];
  protected mailboxList!: Mailbox[];
  protected isSubmitButtonDisabled = false;
  protected favoriteDomainId: string | null = null;
  protected favoriteMailboxId: string | null = null;
  protected aliasFormChosenMailbox: Mailbox | undefined = undefined;
  protected aliasFormChosenDomain: AbstractDomain | undefined = undefined;


  constructor(
    protected securityService: SecurityService,
    protected aliasService: AliasService,
    protected domainService: DomainService,
    protected mailboxService: MailboxService,
    protected flashMessageService: FlashMessageService
  ) {}

  ngOnInit(): void {
    this.securityService.getAuthenticatedUser().subscribe({
      next: (user: User | null) => {
        if (user) {
          this.favoriteDomainId = user.getFavoriteDomain() ? user.getFavoriteDomain()?.getId() as string : null;
          this.favoriteMailboxId = user.getFavoriteMailbox() ? user.getFavoriteMailbox()?.getId() as string : null;

          this.domainService.getCustomDomainList(user.getId() as string).subscribe({
            next: (domainList: AbstractDomain[]) => {
              this.domainList = [...this.domainList, ...domainList.filter(domain => domain.getIsEnabled())];
              this.initAliasFormValues();
            }
          });

          this.domainService.getSubdomainList(user.getId() as string).subscribe({
            next: (domainList: AbstractDomain[]) => {
              this.domainList = [...this.domainList, ...domainList.filter(domain => domain.getIsEnabled())];
              this.initAliasFormValues();
            }
          });

          this.mailboxService.getMailboxList(user.getId() as string).subscribe({
            next: (mailboxList: Mailbox[]) => {
              this.mailboxList = mailboxList.filter(mailbox => mailbox.getIsEnabled() && mailbox.getIsEmailVerified());
              this.initAliasFormValues();
            }
          });
        }
      }
    });

    this.domainFormControl = new FormControl(
      null,
      [
        Validators.required,
      ]
    );

    this.mailboxFormControl = new FormControl(
      null,
      [
        Validators.required,
      ]
    );

    this.recipientFormControl = new FormControl(null, {
      validators: [
        Validators.required,
        Validators.pattern('^(?![-_\.])[A-Za-z0-9-_\.]{1,64}(?<![-_\.])$')
      ],
      updateOn: 'change'
    });

    this.aliasForm = new FormGroup({
      recipient: this.recipientFormControl,
      domain: this.domainFormControl,
      mailbox: this.mailboxFormControl,
    });
    this.aliasForm.valueChanges.subscribe(this.onAliasFormChanged.bind(this));
  }

  protected initAliasFormValues() {
    if (this.domainList && this.domainList.length > 0) {
      this.domainFormControl.setValue(this.favoriteDomainId ? this.favoriteDomainId : this.domainList[0].getId());
    }

    if (this.mailboxList && this.mailboxList.length) {
      this.mailboxFormControl.setValue(this.favoriteMailboxId ? this.favoriteMailboxId : this.mailboxList[0].getId());
    }
  }

  protected onAliasFormChanged(): void {
    if (this.aliasForm && this.aliasForm.valid) {
      this.aliasFormChosenMailbox = this.mailboxList.find(m => m.getId() === this.mailboxFormControl.value);
      this.aliasFormChosenDomain = this.domainList.find(d => d.getId() === this.domainFormControl.value);
    }
  }

  protected onAliasFormSubmit(): void {
    if (this.aliasForm.valid) {
      this.isSubmitButtonDisabled = true;
      this.securityService.getAuthenticatedUser().pipe(
        switchMap((user: User | null) => {
          return user ? this.aliasService.isAliasRecipientAvailable(
            user.getId() as string,
            this.domainFormControl.value,
            this.recipientFormControl.value
          ).pipe(
            switchMap((isAliasRecipientAvailable: boolean) => {
              let result: any = of();

              if (!isAliasRecipientAvailable) {
                this.recipientFormControl.setErrors({ aliasexists: true });
              } else {
                result = this.aliasService.createMailboxAlias(
                  user.getId() as string,
                  this.mailboxFormControl.value,
                  this.domainFormControl.value,
                  this.recipientFormControl.value
                );
              }

              return result;
            })
          ) : of();
        }),
        finalize(() => {
          this.isSubmitButtonDisabled = false;
        })
      ).subscribe({
        next: () => {
          this.flashMessageService.showSuccessMessage($localize `The alias has been created`);
          this.aliasForm.reset();
          this.initAliasFormValues();
        }
      });
    } else {
      this.aliasForm.markAllAsTouched();
      this.aliasForm.updateValueAndValidity();
    }
  }

  protected onDomainFormControlChange(): void {
    this.recipientFormControl.updateValueAndValidity();
  }
}

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
import {Observable, of, ReplaySubject, Subject, switchMap, takeUntil} from "rxjs";
import {finalize, map} from "rxjs/operators";
import {AliasService} from "../../../../common/service/alias.service";
import {User} from "../../../../common/entitiy/user.entity";
import {SecurityService} from "../../../../common/service/security.service";
import {DomainService} from "../../../../common/service/domain.service";
import {ContactService} from "../../../../common/service/contact.service";
import {Contact} from "../../../../common/entitiy/contact.entity";
import {MailboxAlias} from "../../../../common/entitiy/alias/mailbox-alias.entity";
import {EventService} from "../../../../common/service/event.service";
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-contact-alias-add-feature',
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
    NgxMatSelectSearchModule,
    NgIf
  ],
  templateUrl: './contact-alias-add-feature.component.html',
  styleUrl: './contact-alias-add-feature.component.scss'
})
export class ContactAliasAddFeatureComponent implements OnInit {
  protected aliasForm!: FormGroup;
  protected recipientFormControl!: FormControl;
  protected contactFormControl!: FormControl;
  protected mailboxAliasFormControl!: FormControl;
  protected mailboxAliasFilterFormControl: FormControl = new FormControl();
  protected contactList: Contact[] = [];
  protected mailboxAliasList: MailboxAlias[] = [];
  protected mailboxAliasFilteredList: MailboxAlias[] = []; //ReplaySubject<MailboxAlias[]> = new ReplaySubject<MailboxAlias[]>(1);
  protected isSubmitButtonDisabled = false;
  protected onDestroy = new Subject<void>();
  protected aliasFormChosenMailboxAlias: MailboxAlias | undefined = undefined;
  protected aliasFormChosenContact: Contact | undefined = undefined;

  constructor(
      protected securityService: SecurityService,
      protected aliasService: AliasService,
      protected contactService: ContactService,
      protected flashMessageService: FlashMessageService,
      protected eventService: EventService,
  ) {}

  ngOnInit(): void {
    this.contactFormControl = new FormControl(
        null,
        [
          Validators.required,
        ]
    );

    this.mailboxAliasFormControl = new FormControl(
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
      contact: this.contactFormControl,
      mailboxAlias: this.mailboxAliasFormControl,
    });
    this.aliasForm.valueChanges.subscribe(this.onAliasFormChanged.bind(this));

    this.securityService.getAuthenticatedUser().subscribe({
      next: (user: User | null) => {
        if (user) {
          this.contactService.getContactList(user.getId() as string).subscribe({
            next: (contactList: Contact[]) => {
              this.contactList = contactList;
              this.initAliasFormValues();
            }
          });

          this.aliasService.getMailboxAliasList(user.getId() as string).subscribe({
            next: (mailboxAliasList: MailboxAlias[]) => {
              this.mailboxAliasList = mailboxAliasList;
              this.mailboxAliasFilteredList = mailboxAliasList;
              this.initAliasFormValues();
            }
          });
        }
      }
    });

    this.mailboxAliasFilterFormControl.valueChanges
        .pipe(takeUntil(this.onDestroy))
        .subscribe(() => {
          this.filterMailboxAliasList();
        });

    this.eventService.onMailboxAliasAdded().subscribe(
        (alias: MailboxAlias) => {
          this.mailboxAliasList.push(alias);
          this.initAliasFormValues();
        }
    );

    this.eventService.onMailboxAliasRemoved().subscribe(
        (removedAlias: MailboxAlias) => {
          const index = this.mailboxAliasList.findIndex(alias => alias.getId() === removedAlias.getId());
          if (index !== -1) {
            this.mailboxAliasList.splice(index, 1);
            this.initAliasFormValues();
          }
        }
    );

    this.eventService.onMailboxAliasUpdated().subscribe(
        (updatedAlias: MailboxAlias) => {
          if (updatedAlias.getIsEnabled()) {
            this.mailboxAliasList.push(updatedAlias);
          } else {
            const index = this.mailboxAliasList.findIndex(alias => alias.getId() === updatedAlias.getId());
            if (index !== -1) {
              this.mailboxAliasList.splice(index, 1);
            }
          }

          this.initAliasFormValues();
        }
    );
  }

  ngOnDestroy() {
    //this.onDestroy.next();
    this.onDestroy.complete();
  }

  protected filterMailboxAliasList() {
    if (this.mailboxAliasList) {
      let search = this.mailboxAliasFilterFormControl.value;

      if (!search) {
        this.mailboxAliasFilteredList = this.mailboxAliasList;

        return;
      } else {
        search = search.toLowerCase();
      }

      this.mailboxAliasFilteredList =
          this.mailboxAliasList.filter(mailboxAlias => {
            const mailboxAliasValue = (mailboxAlias.getRecipient() || '') + '@' +
                (mailboxAlias.getDomain()?.getDomain() || '');

            return mailboxAliasValue.toLowerCase().indexOf(search) > -1;
          })
      ;
    }
  }

  protected initAliasFormValues() {
    this.contactList = this.contactList.filter(contact => contact.getIsEnabled());
    if (this.contactList.length) {
      this.contactFormControl.setValue(this.contactList[0].getId());
    }

    this.mailboxAliasList = this.mailboxAliasList.filter(mailboxAlias => mailboxAlias.getIsEnabled());
    if (this.mailboxAliasList.length) {
      this.mailboxAliasFormControl.setValue(this.mailboxAliasList[0].getId());
    }
  }

  protected onAliasFormChanged(): void {
    if (this.aliasForm && this.aliasForm.valid) {
      this.aliasFormChosenMailboxAlias = this.mailboxAliasList.find(alias => alias.getId() === this.mailboxAliasFormControl.value);
      this.aliasFormChosenContact = this.contactList.find(contact => contact.getId() === this.contactFormControl.value);
    }
  }

  protected onAliasFormSubmit(): void {
    if (this.aliasForm.valid) {
      this.isSubmitButtonDisabled = true;
      this.securityService.getAuthenticatedUser().pipe(
          switchMap((user: User | null) => {
            const mailboxAlias = this.mailboxAliasList.find(alias => alias.getId() === this.mailboxAliasFormControl.value);

            return user ? this.aliasService.isAliasRecipientAvailable(
              user.getId() as string,
              mailboxAlias?.getDomain()?.getId() as string,
              this.recipientFormControl.value
            ).pipe(
              switchMap((isAliasRecipientAvailable: boolean) => {
                let result: any = of();

                if (!isAliasRecipientAvailable) {
                  this.recipientFormControl.setErrors({ aliasexists: true });
                } else {
                  result = this.aliasService.createContactAlias(
                    user.getId() as string,
                    this.contactFormControl.value,
                    this.mailboxAliasFormControl.value,
                    this.recipientFormControl.value
                  )
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
}

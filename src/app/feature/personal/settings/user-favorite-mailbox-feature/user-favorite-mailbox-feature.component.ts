import {Component, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatError, MatOption, MatSelect} from "@angular/material/select";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {Mailbox} from "../../../../../common/entitiy/mailbox.entity";
import {SecurityService} from "../../../../../common/service/security.service";
import {FlashMessageService} from "../../../../../common/service/flash-message.service";
import {User} from "../../../../../common/entitiy/user.entity";
import {of, switchMap} from "rxjs";
import {finalize} from "rxjs/operators";
import {UserService} from "../../../../../common/service/user.service";
import {MatIcon} from "@angular/material/icon";
import {MailboxService} from "../../../../../common/service/mailbox.service";

@Component({
  selector: 'app-user-favorite-mailbox-feature',
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
    MatIconButton
  ],
  templateUrl: './user-favorite-mailbox-feature.component.html',
  styleUrl: './user-favorite-mailbox-feature.component.scss'
})
export class UserFavoriteMailboxFeatureComponent implements OnInit {
  protected favoriteMailboxForm!: FormGroup;
  protected mailboxFormControl!: FormControl;
  protected mailboxList!: Mailbox[];
  protected isSubmitButtonDisabled = false;
  protected favoriteMailboxId: string | null = null;


  constructor(
    protected securityService: SecurityService,
    protected mailboxService: MailboxService,
    protected flashMessageService: FlashMessageService,
    protected userService: UserService
  ) {}

  ngOnInit(): void {
    this.securityService.getAuthenticatedUser().subscribe({

      next: (user: User | null) => {
        if (user) {
          this.favoriteMailboxId = user.getFavoriteMailbox() ? user.getFavoriteMailbox()?.getId() as string : null;

          this.mailboxService.getMailboxList(user.getId() as string).subscribe({
            next: (mailboxList: Mailbox[]) => {
              this.mailboxList = mailboxList.filter(mailbox => mailbox.getIsEnabled() && mailbox.getIsEmailVerified());
              this.initFavoriteMailboxFormValues();
            }
          });
        }
      }
    });

    this.mailboxFormControl = new FormControl(
      null,
      [
        Validators.required,
      ]
    );

    this.favoriteMailboxForm = new FormGroup({
      domain: this.mailboxFormControl,
    });
  }

  protected initFavoriteMailboxFormValues() {
    if (this.mailboxList && this.mailboxList.length > 0 && this.favoriteMailboxId) {
      this.mailboxFormControl.setValue(this.favoriteMailboxId ? this.favoriteMailboxId : null);
    }
  }

  protected onFavoriteMailboxFormSubmit(): void {
    if (this.favoriteMailboxForm.valid) {
      this.isSubmitButtonDisabled = true;

      const favoriteMailbox = this.mailboxList.find(mailbox => mailbox.getId() == this.mailboxFormControl.value);

      this.securityService.getAuthenticatedUser().pipe(
        switchMap((user: User | null) => {
          return user ? this.userService.favoriteMailbox(
            user,
            favoriteMailbox as Mailbox,
          ) : of();
        }),
        finalize(() => {
          this.isSubmitButtonDisabled = false;
        })
      ).subscribe({
        next: () => {
          this.favoriteMailboxId = this.mailboxFormControl.value;
          this.flashMessageService.showSuccessMessage($localize `The mailbox has been successfully marked as favorite`);
          this.favoriteMailboxForm.reset();
          this.initFavoriteMailboxFormValues();
        }
      });
    } else {
      this.favoriteMailboxForm.markAllAsTouched();
      this.favoriteMailboxForm.updateValueAndValidity();
    }
  }
}

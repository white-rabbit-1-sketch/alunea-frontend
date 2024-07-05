import {Component, OnInit} from '@angular/core';
import {Observable, of, switchMap} from "rxjs";
import {finalize, map} from "rxjs/operators";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatSelect, MatOption, MatLabel, MatError} from "@angular/material/select";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {FlashMessageService} from "../../../../common/service/flash-message.service";
import {MailboxService} from "../../../../common/service/mailbox.service";
import {User} from "../../../../common/entitiy/user.entity";
import {SecurityService} from "../../../../common/service/security.service";

@Component({
  selector: 'app-mailbox-add-feature',
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
  templateUrl: './mailbox-add-feature.component.html',
  styleUrl: './mailbox-add-feature.component.scss'
})
export class MailboxAddFeatureComponent implements OnInit {
  protected mailboxForm!: FormGroup;
  protected emailFormControl!: FormControl;
  protected isSubmitButtonDisabled = false;


  constructor(
    protected mailboxService: MailboxService,
    protected securityService: SecurityService,
    protected flashMessageService: FlashMessageService
  ) {}

  ngOnInit(): void {
    this.emailFormControl = new FormControl(null, {
      validators: [
        Validators.required,
        Validators.email,
        Validators.pattern('^[\\w\\.-]+@[\\w\\.-]+\\.[a-zA-Z]{2,6}$')
      ],
      updateOn: 'change'
    });

    this.mailboxForm = new FormGroup({
      recipient: this.emailFormControl,
    });
  }

  protected onMailboxFormSubmit(): void {
    if (this.mailboxForm.valid) {
      this.isSubmitButtonDisabled = true;
      this.securityService.getAuthenticatedUser().pipe(
        switchMap((user: User | null) => {
          return user ? this.mailboxService.isMailboxAvailable(
            user.getId() as string,
            this.emailFormControl.value
          ).pipe(
            switchMap((isMailboxAvailable: boolean) => {
              let result: any = of();

              if (!isMailboxAvailable) {
                this.emailFormControl.setErrors({ mailboxexists: true });
              } else {
                result = this.mailboxService.createMailbox(
                  user.getId() as string,
                  this.emailFormControl.value
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
          this.flashMessageService.showSuccessMessage($localize `The mailbox has been created`);
          this.mailboxForm.reset();
        }
      });
    } else {
      this.mailboxForm.markAllAsTouched();
      this.mailboxForm.updateValueAndValidity();
    }
  }
}

import { Component } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SecurityService} from "../../../../../common/service/security.service";
import {User} from "../../../../../common/entitiy/user.entity";
import {Mailbox} from "../../../../../common/entitiy/mailbox.entity";
import {MailboxService} from "../../../../../common/service/mailbox.service";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatError, MatSelect} from "@angular/material/select";
import {NgIf} from "@angular/common";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-subdomain-enable-catch-all-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    NgIf,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatError,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './subdomain-enable-catch-all-dialog.component.html',
  styleUrl: './subdomain-enable-catch-all-dialog.component.scss'
})
export class SubdomainEnableCatchAllDialogComponent {
  protected mailboxForm!: FormGroup;
  protected mailboxFormControl!: FormControl;
  protected mailboxList: Mailbox[] = [];
  protected isSubmitButtonDisabled = false;

  constructor(
    protected securityService: SecurityService,
    protected mailboxService: MailboxService,
    protected dialogRef: MatDialogRef<SubdomainEnableCatchAllDialogComponent>,
  ) {}

  ngOnInit(): void {
    this.mailboxFormControl = new FormControl(
      null,
      [
        Validators.required,
      ]
    );

    this.mailboxForm = new FormGroup({
      mailbox: this.mailboxFormControl,
    });

    this.securityService.getAuthenticatedUser().subscribe({
      next: (user: User | null) => {
        if (user) {
          this.mailboxService.getMailboxList(user.getId() as string).subscribe({
            next: (mailboxList: Mailbox[]) => {
              this.mailboxList = mailboxList;
              this.initMailboxFormValues();
            }
          });
        }
      }
    });
  }

  protected initMailboxFormValues() {
    this.mailboxList = this.mailboxList.filter(m => m.getIsEnabled());
    if (this.mailboxList.length) {
      this.mailboxFormControl.setValue(this.mailboxList[0].getId());
    }
  }

  protected onMailboxFormSubmit(): void {
    if (this.mailboxForm.valid) {
      const mailbox = this.mailboxList.find(m => m.getId() == this.mailboxFormControl.value);
      this.dialogRef.close(mailbox);
    }
  }
}

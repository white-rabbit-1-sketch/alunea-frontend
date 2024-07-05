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
import {ContactService} from "../../../../common/service/contact.service";

@Component({
  selector: 'app-contact-add-feature',
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
  templateUrl: './contact-add-feature.component.html',
  styleUrl: './contact-add-feature.component.scss'
})
export class ContactAddFeatureComponent implements OnInit {
  protected contactForm!: FormGroup;
  protected emailFormControl!: FormControl;
  protected isSubmitButtonDisabled = false;


  constructor(
      protected contactService: ContactService,
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

    this.contactForm = new FormGroup({
      email: this.emailFormControl,
    });
  }

  protected onContactFormSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitButtonDisabled = true;
      this.securityService.getAuthenticatedUser().pipe(
          switchMap((user: User | null) => {
            return user ? this.contactService.isContactAvailable(
              user.getId() as string,
              this.emailFormControl.value
            ).pipe(
              switchMap((isContactAvailable: boolean) => {
                let result: any = of();

                if (!isContactAvailable) {
                  this.emailFormControl.setErrors({ contactexists: true });
                } else {
                  result = this.contactService.createContact(
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
          this.flashMessageService.showSuccessMessage($localize `The contact has been created`);
          this.contactForm.reset();
        }
      });
    } else {
      this.contactForm.markAllAsTouched();
      this.contactForm.updateValueAndValidity();
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {SecurityService} from "../../../../../common/service/security.service";
import {FlashMessageService} from "../../../../../common/service/flash-message.service";
import {User} from "../../../../../common/entitiy/user.entity";
import {Observable, of, switchMap} from "rxjs";
import {finalize, map} from "rxjs/operators";
import {MatError, MatOption, MatSelect} from "@angular/material/select";
import {UserService} from "../../../../../common/service/user.service";

@Component({
  selector: 'app-user-email-change-feature',
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
  templateUrl: './user-email-change-feature.component.html',
  styleUrl: './user-email-change-feature.component.scss'
})
export class UserEmailChangeFeatureComponent implements OnInit {
  protected emailForm!: FormGroup;
  protected emailFormControl!: FormControl;
  protected isSubmitButtonDisabled = false;

  constructor(
    protected securityService: SecurityService,
    protected userService: UserService,
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

    this.emailForm = new FormGroup({
      recipient: this.emailFormControl,
    });

    this.securityService.getAuthenticatedUser().subscribe({
      next: (user: User | null) => {
        if (user) {
          this.emailFormControl.setValue(user.getEmail() as string);
        }
      }
    });
  }

  protected onEmailFormSubmit(): void {
    if (this.emailForm.valid) {
      this.isSubmitButtonDisabled = true;
      this.securityService.getAuthenticatedUser().pipe(
        switchMap((user: User | null) => {
          return user ? this.userService.isUserEmailAvailable(this.emailFormControl.value).pipe(
            switchMap((isEmailAvailable: boolean) => {
              let result: any = of();

              if (!isEmailAvailable) {
                this.emailFormControl.markAllAsTouched();
                this.emailFormControl.setErrors({ emailnotavailable: true });
              } else {
                result = this.userService.updateUserEmail(
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
          let email = this.emailFormControl.value;
          this.securityService.getAuthenticatedUser().subscribe({
            next: (user: User | null) => {
              user && user.setEmail(email);
            }
          });

          this.flashMessageService.showSuccessMessage($localize `An email with verification link has been sent to the provided email address`);
          this.emailForm.reset();
          this.emailFormControl.setValue(email);
        }
      });
    } else {
      this.emailForm.markAllAsTouched();
      this.emailForm.updateValueAndValidity();
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {SecurityService} from "../../../../../common/service/security.service";
import {FlashMessageService} from "../../../../../common/service/flash-message.service";
import {User} from "../../../../../common/entitiy/user.entity";
import {of, switchMap} from "rxjs";
import {finalize} from "rxjs/operators";
import {MatError, MatOption, MatSelect} from "@angular/material/select";
import {UserService} from "../../../../../common/service/user.service";

@Component({
  selector: 'app-user-password-change-feature',
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
  templateUrl: './user-password-change-feature.component.html',
  styleUrl: './user-password-change-feature.component.scss'
})
export class UserPasswordChangeFeatureComponent implements OnInit {
  protected passwordChangeForm!: FormGroup;
  protected currentPasswordFormControl!: FormControl;
  protected newPasswordFormControl!: FormControl;
  protected isSubmitButtonDisabled = false;

  constructor(
    protected securityService: SecurityService,
    protected userService: UserService,
    protected flashMessageService: FlashMessageService
  ) {}

  ngOnInit(): void {
    this.currentPasswordFormControl = new FormControl(null, {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100)
      ],
    });

    this.newPasswordFormControl = new FormControl(null, {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100)
      ],
    });

    this.passwordChangeForm = new FormGroup({
      currentPassword: this.currentPasswordFormControl,
      newPassword: this.newPasswordFormControl,
    });
  }

  protected onPasswordChangeFormSubmit(): void {
    if (this.passwordChangeForm.valid) {
      this.isSubmitButtonDisabled = true;

      this.securityService.getAuthenticatedUser().pipe(
        switchMap((user: User | null) => {
          return user ? this.userService.updateUserPassword(
            user,
            this.currentPasswordFormControl.value,
            this.newPasswordFormControl.value
          ) : of();
        }),
        finalize(() => {
          this.isSubmitButtonDisabled = false;
        }),
      ).subscribe({
        next: () => {
          this.flashMessageService.showSuccessMessage($localize `The password has been changed`);
          this.passwordChangeForm.reset();
        }
      });
    } else {
      this.passwordChangeForm.markAllAsTouched();
      this.passwordChangeForm.updateValueAndValidity();
    }
  }
}

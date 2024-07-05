import {Component, OnInit} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {finalize} from 'rxjs/operators';
import {LogoComponent} from "../../../layout/base-layout/logo/logo.component";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {UserService} from "../../../../common/service/user.service";
import {FlashMessageService} from "../../../../common/service/flash-message.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-user-password-reset-feature',
  standalone: true,
  imports: [
    FormsModule,
    LogoComponent,
    MatButton,
    MatFormField,
    MatInputModule,
    MatLabel,
    RouterLink,
    ReactiveFormsModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './user-password-reset-feature.component.html',
  styleUrl: './user-password-reset-feature.component.scss'
})
export class UserPasswordResetFeatureComponent implements OnInit {
  protected readonly STEP_INIT = 'init';
  protected readonly STEP_RESET = 'reset';

  protected isSubmitButtonDisabled = false;
  protected passwordResetInitForm!: FormGroup;
  protected passwordResetForm!: FormGroup;
  protected emailFormControl!: FormControl;
  protected passwordFormControl!: FormControl;
  protected step!: string;
  protected passwordResetToken: string | null = null;

  constructor(
    protected userService: UserService,
    protected flashMessageService: FlashMessageService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router
  ) {
  }

  ngOnInit(): void {
    this.passwordResetToken = this.activatedRoute.snapshot.queryParamMap.get('user-password-reset-token');
    this.step = this.STEP_INIT;
    if (this.passwordResetToken) {
      this.step = this.STEP_RESET;
    }

    this.emailFormControl = new FormControl(null, [
      Validators.required,
      Validators.email,
      Validators.pattern('^[\\w\\.-]+@[\\w\\.-]+\\.[a-zA-Z]{2,6}$')
    ]);

    this.passwordResetInitForm = new FormGroup({
      email: this.emailFormControl,
    });

    this.passwordFormControl = new FormControl(null, {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100)
      ],
      updateOn: 'blur'
    });

    this.passwordResetForm = new FormGroup({
      password: this.passwordFormControl,
    });
  }

  protected onPasswordResetInitFormSubmit(): void {
    if (this.passwordResetInitForm.valid) {
      this.isSubmitButtonDisabled = true;
      this.userService.sendResetUserPasswordEmail(this.emailFormControl.value).pipe(
        finalize(() => {
          this.isSubmitButtonDisabled = false;
        })).subscribe({
        next: () => {
          this.flashMessageService.showSuccessMessage($localize `An email with instructions on how to reset your password has been sent to the provided email address`);
          this.passwordResetInitForm.reset();
        },
      });
    }
  }

  protected onPasswordResetFormSubmit(): void {
    if (this.passwordResetForm.valid) {
      this.isSubmitButtonDisabled = true;
      this.userService.resetUserPassword(
        this.passwordResetToken as string,
        this.passwordFormControl.value
      ).pipe(
        finalize(() => {
          this.isSubmitButtonDisabled = false;
        })).subscribe({
        next: () => {
          this.flashMessageService.showSuccessMessage($localize `The new password has been set successfully`);
          this.passwordResetInitForm.reset();
          this.router.navigate(['/signin']);
        },
      });
    }
  }
}

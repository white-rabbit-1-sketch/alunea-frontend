import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Observable, switchMap} from 'rxjs';
import {map, finalize} from 'rxjs/operators';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {UserService} from "../../../../common/service/user.service";
import {MatFormField} from "@angular/material/form-field";
import {MatInput, MatError, MatLabel} from "@angular/material/input";
import {MatAnchor, MatButton} from "@angular/material/button";
import {LogoComponent} from "../../../layout/base-layout/logo/logo.component";
import {Router, RouterLink} from "@angular/router";
import {User} from "../../../../common/entitiy/user.entity";
import {SecurityService} from "../../../../common/service/security.service";
import {
  SubdomainAddFeatureComponent
} from "../../personal/subdomain-add-feature/subdomain-add-feature.component";
import {LocalizationService} from "../../../../common/service/localization.service";

@Component({
  selector: 'app-signup-feature',
  standalone: true,
  imports: [
    CommonModule,
    SubdomainAddFeatureComponent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatError,
    MatLabel,
    LogoComponent,
    RouterLink,
    MatAnchor
  ],
  providers: [],
  templateUrl: './signup-feature.component.html',
  styleUrl: './signup-feature.component.scss'
})
export class SignupFeatureComponent implements OnInit {
  protected signupForm!: FormGroup;
  protected emailFormControl!: FormControl;
  protected passwordFormControl!: FormControl;
  protected isSubmitButtonDisabled = false;

  constructor(
    protected userService: UserService,
    protected securityService: SecurityService,
    protected router: Router,
    protected localizationService: LocalizationService
  ) {
  }

  ngOnInit(): void {
    this.securityService.getAuthenticatedUser().subscribe({
      next: (user: User | null) => {
        if (user) {
          this.router.navigate(['/personal/aliases']);
        }
      }
    });

    this.emailFormControl = new FormControl(null, {
      validators: [
        Validators.required,
        Validators.email,
        Validators.pattern('^[\\w\\.-]+@[\\w\\.-]+\\.[a-zA-Z]{2,6}$')
      ],
      asyncValidators: [
        this.emailAvailableValidator.bind(this)
      ],
      updateOn: 'blur'
    });

    this.passwordFormControl = new FormControl(null, {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100)
      ],
      updateOn: 'blur'
    });

    this.signupForm = new FormGroup({
      email: this.emailFormControl,
      password: this.passwordFormControl,
    });
  }

  protected onSignupFormSubmit(): void {
    if (this.signupForm.valid) {
      this.isSubmitButtonDisabled = true;
      this.userService.createUser(
        this.emailFormControl.value,
        this.passwordFormControl.value,
        this.localizationService.getCurrentLanguage()
      ).pipe(
        switchMap(() => {
          return this.securityService.authenticateUser(
            this.emailFormControl.value,
            this.passwordFormControl.value
          );
        }),
        finalize(() => {
          this.isSubmitButtonDisabled = false;
        })
      ).subscribe({
        next: () => {
          this.router.navigate(['/personal/aliases']);
        }
      });
    }
  }

  protected emailAvailableValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;

    return this.userService.isUserEmailAvailable(email).pipe(
      map((isEmailAvailable: boolean) => (!isEmailAvailable ? {emailnotavailable: true} : null))
    );
  }
}

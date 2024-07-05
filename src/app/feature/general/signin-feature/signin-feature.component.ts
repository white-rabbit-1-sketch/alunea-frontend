import {Component, Input, OnInit} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {finalize} from 'rxjs/operators';
import {LogoComponent} from "../../../layout/base-layout/logo/logo.component";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {Router, RouterLink} from "@angular/router";
import {SecurityService} from "../../../../common/service/security.service";
import {User} from "../../../../common/entitiy/user.entity";
import {NgIf} from "@angular/common";
import {FlashMessageService} from "../../../../common/service/flash-message.service";

@Component({
  selector: 'app-signin-feature',
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
    NgIf
  ],
  templateUrl: './signin-feature.component.html',
  styleUrl: './signin-feature.component.scss'
})
export class SigninFeatureComponent implements OnInit {
  protected isSubmitButtonDisabled = false;
  protected signinForm!: FormGroup;
  protected emailFormControl!: FormControl;
  protected passwordFormControl!: FormControl;

  constructor(
    protected securityService: SecurityService,
    protected flashMessageService: FlashMessageService,
    protected router: Router
  ) {}

  ngOnInit(): void {
    this.securityService.getAuthenticatedUser().subscribe({
      next: (user: User | null) => {
        if (user) {
          this.router.navigate(['/personal/aliases']);
        }
      }
    });

    this.emailFormControl = new FormControl(null, [
      Validators.required,
      Validators.email,
      Validators.pattern('^[\\w\\.-]+@[\\w\\.-]+\\.[a-zA-Z]{2,6}$')
    ]);

    this.passwordFormControl = new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100)
    ]);

    this.signinForm = new FormGroup({
      email: this.emailFormControl,
      password: this.passwordFormControl,
    });
  }

  protected onSigninFormSubmit(): void {
    if (this.signinForm.valid) {
      this.isSubmitButtonDisabled = true;
      this.securityService.authenticateUser(
        this.emailFormControl.value,
        this.passwordFormControl.value
      ).pipe(finalize(() => {
        this.isSubmitButtonDisabled = false;
      })).subscribe({
        next: () => {
          this.router.navigate(['/personal/aliases']);
        }
      });
    }
  }
}

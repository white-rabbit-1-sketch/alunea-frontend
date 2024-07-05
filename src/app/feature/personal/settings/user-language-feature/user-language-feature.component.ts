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
import {SecurityService} from "../../../../../common/service/security.service";
import {FlashMessageService} from "../../../../../common/service/flash-message.service";
import {User} from "../../../../../common/entitiy/user.entity";
import {of, switchMap} from "rxjs";
import {finalize} from "rxjs/operators";
import {UserService} from "../../../../../common/service/user.service";
import {MatIcon} from "@angular/material/icon";
import {LocalizationService} from "../../../../../common/service/localization.service";
import {Language} from "../../../../../common/model/language.model";

@Component({
  selector: 'app-user-language-feature',
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
  templateUrl: './user-language-feature.component.html',
  styleUrl: './user-language-feature.component.scss'
})
export class UserLanguageFeatureComponent implements OnInit {
  protected languageForm!: FormGroup;
  protected languageFormControl!: FormControl;
  protected languageList: Language[] = LocalizationService.AVAILABLE_LANGUAGE_LIST;
  protected isSubmitButtonDisabled = false;
  protected languageId: string | null = null;

  constructor(
      protected localizationService: LocalizationService,
      protected securityService: SecurityService,
      protected flashMessageService: FlashMessageService,
      protected userService: UserService
  ) {}

  ngOnInit(): void {
    this.languageFormControl = new FormControl(
        null,
        [
          Validators.required,
        ]
    );

    this.languageForm = new FormGroup({
      language: this.languageFormControl,
    });

    this.securityService.getAuthenticatedUser().subscribe({
      next: (user: User | null) => {
        if (user) {
          this.languageId = user.getLanguage() ? user.getLanguage() as string : null;
          this.initLanguageFormValues();
        }
      }
    });
  }

  protected initLanguageFormValues() {
    if (this.languageList && this.languageList.length > 0 && this.languageId) {
      this.languageFormControl.setValue(this.languageId ? this.languageId : null);
    }
  }

  protected onLanguageFormSubmit(): void {
    if (this.languageForm.valid) {
      this.isSubmitButtonDisabled = true;
      this.securityService.getAuthenticatedUser().pipe(
          switchMap((user: User | null) => {
            return user ? this.userService.updateUserLanguage(
                user,
                this.languageFormControl.value,
            ) : of();
          }),
          finalize(() => {
            this.isSubmitButtonDisabled = false;
          })
      ).subscribe({
        next: () => {
          this.languageId = this.languageFormControl.value;
          this.flashMessageService.showSuccessMessage($localize `The language has been successfully set`);
          this.languageForm.reset();
          this.initLanguageFormValues();
        }
      });
    } else {
      this.languageForm.markAllAsTouched();
      this.languageForm.updateValueAndValidity();
    }
  }
}

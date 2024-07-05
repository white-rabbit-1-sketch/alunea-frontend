import {Component, OnInit} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatSelect, MatOption, MatLabel, MatError} from "@angular/material/select";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {FlashMessageService} from "../../../../common/service/flash-message.service";
import {InformationSubscriptionService} from "../../../../common/service/information-subscription.service";
import {finalize} from "rxjs/operators";
import {LocalizationService} from "../../../../common/service/localization.service";

@Component({
  selector: 'app-email-subscription-feature',
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
  templateUrl: './email-subscription-feature.component.html',
  styleUrl: './email-subscription-feature.component.scss'
})
export class EmailSubscriptionFeatureComponent implements OnInit {
  protected emailSubscriptionForm!: FormGroup;
  protected emailFormControl!: FormControl;
  protected isSubmitButtonDisabled = false;

  constructor(
    protected informationSubscriptionService: InformationSubscriptionService,
    protected flashMessageService: FlashMessageService,
    protected localizationService: LocalizationService
  ) {}

  ngOnInit(): void {
    this.emailFormControl = new FormControl(null, {
      validators: [
        Validators.required,
        Validators.email,
        Validators.pattern('^[\\w\\.-]+@[\\w\\.-]+\\.[a-zA-Z]{2,6}$')
      ]
    });

    this.emailSubscriptionForm = new FormGroup({
      email: this.emailFormControl,
    });
  }

  protected onEmailSubscriptionFormSubmit(): void {
    if (this.emailSubscriptionForm.valid) {
      this.isSubmitButtonDisabled = true;

      this.informationSubscriptionService.anonymousSubscribeOnGeneralNews(
        this.emailFormControl.value,
        this.localizationService.getCurrentLanguage()
      ).pipe(
       finalize(() => {
         this.isSubmitButtonDisabled = false;
       })
      ).subscribe({
        next: () => {
          this.flashMessageService.showSuccessMessage($localize `The subscription has been created`);
          this.emailSubscriptionForm.reset();
        }
      });
    } else {
      this.emailSubscriptionForm.markAllAsTouched();
      this.emailSubscriptionForm.updateValueAndValidity();
    }
  }
}

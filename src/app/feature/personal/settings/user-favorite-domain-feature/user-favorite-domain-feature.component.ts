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
import {AbstractDomain} from "../../../../../common/entitiy/domain/abstract-domain.entity";
import {SecurityService} from "../../../../../common/service/security.service";
import {FlashMessageService} from "../../../../../common/service/flash-message.service";
import {User} from "../../../../../common/entitiy/user.entity";
import {of, switchMap} from "rxjs";
import {finalize} from "rxjs/operators";
import {UserService} from "../../../../../common/service/user.service";
import {MatIcon} from "@angular/material/icon";
import {DomainService} from "../../../../../common/service/domain.service";

@Component({
  selector: 'app-user-favorite-domain-feature',
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
  templateUrl: './user-favorite-domain-feature.component.html',
  styleUrl: './user-favorite-domain-feature.component.scss'
})
export class UserFavoriteDomainFeatureComponent implements OnInit {
  protected favoriteDomainForm!: FormGroup;
  protected domainFormControl!: FormControl;
  protected domainList: AbstractDomain[] = [];
  protected isSubmitButtonDisabled = false;
  protected favoriteDomainId: string | null = null;


  constructor(
    protected securityService: SecurityService,
    protected domainService: DomainService,
    protected flashMessageService: FlashMessageService,
    protected userService: UserService
  ) {}

  ngOnInit(): void {
    this.securityService.getAuthenticatedUser().subscribe({

      next: (user: User | null) => {
        if (user) {
          this.favoriteDomainId = user.getFavoriteDomain() ? user.getFavoriteDomain()?.getId() as string : null;

          this.domainService.getCustomDomainList(user.getId() as string).subscribe({
            next: (domainList: AbstractDomain[]) => {
              this.domainList = [...this.domainList, ...domainList.filter(domain => domain.getIsEnabled())];
              this.initFavoriteDomainFormValues();
            }
          });

          this.domainService.getSubdomainList(user.getId() as string).subscribe({
            next: (domainList: AbstractDomain[]) => {
              this.domainList = [...this.domainList, ...domainList.filter(domain => domain.getIsEnabled())];
              this.initFavoriteDomainFormValues();
            }
          });
        }
      }
    });

    this.domainFormControl = new FormControl(
      null,
      [
        Validators.required,
      ]
    );

    this.favoriteDomainForm = new FormGroup({
      domain: this.domainFormControl,
    });
  }

  protected initFavoriteDomainFormValues() {
    console.log(this.favoriteDomainId);
    if (this.domainList && this.domainList.length > 0 && this.favoriteDomainId) {
      this.domainFormControl.setValue(this.favoriteDomainId ? this.favoriteDomainId : null);
    }
  }

  protected onFavoriteDomainFormSubmit(): void {
    if (this.favoriteDomainForm.valid) {
      this.isSubmitButtonDisabled = true;

      const favoriteDomain = this.domainList.find(domain => domain.getId() == this.domainFormControl.value);

      this.securityService.getAuthenticatedUser().pipe(
        switchMap((user: User | null) => {
          return user ? this.userService.favoriteDomain(
            user,
            favoriteDomain as AbstractDomain,
          ) : of();
        }),
        finalize(() => {
          this.isSubmitButtonDisabled = false;
        })
      ).subscribe({
        next: () => {
          this.favoriteDomainId = this.domainFormControl.value;
          this.flashMessageService.showSuccessMessage($localize `The domain has been successfully marked as favorite`);
          this.favoriteDomainForm.reset();
          this.initFavoriteDomainFormValues();
        }
      });
    } else {
      this.favoriteDomainForm.markAllAsTouched();
      this.favoriteDomainForm.updateValueAndValidity();
    }
  }
}

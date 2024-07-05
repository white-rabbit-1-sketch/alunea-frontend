import {Component, OnInit} from '@angular/core';
import {AbstractDomain} from "../../../../common/entitiy/domain/abstract-domain.entity";
import {Observable, of, switchMap} from "rxjs";
import {finalize, map} from "rxjs/operators";
import {
  AbstractControl,
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
import {User} from "../../../../common/entitiy/user.entity";
import {SecurityService} from "../../../../common/service/security.service";
import {DomainService} from "../../../../common/service/domain.service";
import {Contact} from "../../../../common/entitiy/contact.entity";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-subdomain-add-feature',
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
    MatIconButton,
    NgIf
  ],
  templateUrl: './subdomain-add-feature.component.html',
  styleUrl: './subdomain-add-feature.component.scss'
})
export class SubdomainAddFeatureComponent implements OnInit {
  protected subdomainForm!: FormGroup;
  protected subdomainFormControl!: FormControl;
  protected domainFormControl!: FormControl;
  protected domainList!: AbstractDomain[];
  protected isSubmitButtonDisabled = false;
  protected subdomainFormChosenDomain: AbstractDomain | undefined = undefined;


  constructor(
    protected securityService: SecurityService,
    protected domainService: DomainService,
    protected flashMessageService: FlashMessageService
  ) {}

  ngOnInit(): void {
    this.domainService.getSystemDomainList().subscribe({
      next: (domainList: AbstractDomain[]) => {
        this.domainList = domainList;
        this.initSubdomainFormValues();
      }
    });

    this.domainFormControl = new FormControl(
      null,
      [
        Validators.required,
      ]
    );

    this.subdomainFormControl = new FormControl(null, {
      validators: [
        Validators.required,
        Validators.pattern('^(?!-)[A-Za-z0-9-]{1,63}(?<!-)$')
      ],
      updateOn: 'change'
    });

    this.subdomainForm = new FormGroup({
      subdomain: this.subdomainFormControl,
      domain: this.domainFormControl,
    });
    this.subdomainForm.valueChanges.subscribe(this.onSubdomainFormChanged.bind(this));
  }

  protected initSubdomainFormValues() {
    this.domainFormControl.setValue(this.domainList && this.domainList.length > 0 ? this.domainList[0].getId() : null);
  }

  protected onSubdomainFormChanged(): void {
    if (this.subdomainForm && this.subdomainForm.valid) {
      this.subdomainFormChosenDomain = this.domainList.find(d => d.getId() === this.domainFormControl.value);
    }
  }

  protected onSubdomainFormSubmit(): void {
    if (this.subdomainForm.valid) {
      this.isSubmitButtonDisabled = true;
      this.securityService.getAuthenticatedUser().pipe(
        switchMap((user: User | null) => {
          return user ? this.domainService.isSubdomainAvailable(
            this.domainFormControl.value,
            this.subdomainFormControl.value
          ).pipe(
            switchMap((isSubdomainAvailable: boolean) => {
              let result: any = of();

              if (!isSubdomainAvailable) {
                this.subdomainFormControl.setErrors({ subdomainexists: true });
              } else {
                result = this.domainService.createSubdomain(
                  user.getId() as string,
                  this.domainFormControl.value,
                  this.subdomainFormControl.value
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
          this.flashMessageService.showSuccessMessage($localize `The subdomain has been created`);
          this.subdomainForm.reset();
          this.initSubdomainFormValues();
        }
      });
    } else {
      this.subdomainForm.markAllAsTouched();
      this.subdomainForm.updateValueAndValidity();
    }
  }

  protected onDomainFormControlChange(): void {
    this.subdomainFormControl.updateValueAndValidity();
  }
}

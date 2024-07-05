import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEmailVerificationFeatureComponent } from './user-email-verification-feature.component';

describe('EmailVerificationFeatureComponent', () => {
  let component: UserEmailVerificationFeatureComponent;
  let fixture: ComponentFixture<UserEmailVerificationFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserEmailVerificationFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserEmailVerificationFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

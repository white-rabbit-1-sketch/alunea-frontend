import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEmailVerificationPageComponent } from './user-email-verification-page.component';

describe('EmailVerificationPageComponent', () => {
  let component: UserEmailVerificationPageComponent;
  let fixture: ComponentFixture<UserEmailVerificationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserEmailVerificationPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserEmailVerificationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

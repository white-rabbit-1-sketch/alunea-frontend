import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPasswordResetFeatureComponent } from './user-password-reset-feature.component';

describe('PasswordRestoreFeatureComponent', () => {
  let component: UserPasswordResetFeatureComponent;
  let fixture: ComponentFixture<UserPasswordResetFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPasswordResetFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPasswordResetFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

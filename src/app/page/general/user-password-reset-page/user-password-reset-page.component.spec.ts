import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPasswordResetPageComponent } from './user-password-reset-page.component';

describe('PasswordRestorePageComponent', () => {
  let component: UserPasswordResetPageComponent;
  let fixture: ComponentFixture<UserPasswordResetPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPasswordResetPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPasswordResetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

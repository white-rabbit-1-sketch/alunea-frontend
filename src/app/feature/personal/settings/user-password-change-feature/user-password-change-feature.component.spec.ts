import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPasswordChangeFeatureComponent } from './user-password-change-feature.component';

describe('PasswordChangeFeatureComponent', () => {
  let component: UserPasswordChangeFeatureComponent;
  let fixture: ComponentFixture<UserPasswordChangeFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPasswordChangeFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPasswordChangeFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEmailChangeFeatureComponent } from './user-email-change-feature.component';

describe('EmailChangeFeatureComponent', () => {
  let component: UserEmailChangeFeatureComponent;
  let fixture: ComponentFixture<UserEmailChangeFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserEmailChangeFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserEmailChangeFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

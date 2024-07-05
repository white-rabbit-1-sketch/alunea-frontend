import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLanguageFeatureComponent } from './user-language-feature.component';

describe('UserLanguageFeatureComponent', () => {
  let component: UserLanguageFeatureComponent;
  let fixture: ComponentFixture<UserLanguageFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLanguageFeatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserLanguageFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFavoriteDomainFeatureComponent } from './user-favorite-domain-feature.component';

describe('UserFavoriteDomainFeatureComponent', () => {
  let component: UserFavoriteDomainFeatureComponent;
  let fixture: ComponentFixture<UserFavoriteDomainFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFavoriteDomainFeatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserFavoriteDomainFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

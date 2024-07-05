import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFavoriteMailboxFeatureComponent } from './user-favorite-mailbox-feature.component';

describe('UserFavoriteMailboxFeatureComponent', () => {
  let component: UserFavoriteMailboxFeatureComponent;
  let fixture: ComponentFixture<UserFavoriteMailboxFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFavoriteMailboxFeatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserFavoriteMailboxFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRemoveFeatureComponent } from './user-remove-feature.component';

describe('UserRemoveFeatureComponent', () => {
  let component: UserRemoveFeatureComponent;
  let fixture: ComponentFixture<UserRemoveFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRemoveFeatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserRemoveFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninFeatureComponent } from './signin-feature.component';

describe('SigninFeatureComponent', () => {
  let component: SigninFeatureComponent;
  let fixture: ComponentFixture<SigninFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigninFeatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SigninFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

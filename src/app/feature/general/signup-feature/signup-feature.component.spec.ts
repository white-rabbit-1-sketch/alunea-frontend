import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFeatureComponent } from './signup-feature.component';

describe('SignupFeatureComponent', () => {
  let component: SignupFeatureComponent;
  let fixture: ComponentFixture<SignupFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupFeatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

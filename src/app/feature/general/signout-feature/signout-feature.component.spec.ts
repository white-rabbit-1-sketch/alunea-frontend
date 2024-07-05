import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignoutFeatureComponent } from './signout-feature.component';

describe('SignoutFeatureComponent', () => {
  let component: SignoutFeatureComponent;
  let fixture: ComponentFixture<SignoutFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignoutFeatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignoutFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

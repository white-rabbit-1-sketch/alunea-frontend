import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSubscriptionFeatureComponent } from './email-subscription-feature.component';

describe('EmailSubscriptionFeatureComponent', () => {
  let component: EmailSubscriptionFeatureComponent;
  let fixture: ComponentFixture<EmailSubscriptionFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailSubscriptionFeatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailSubscriptionFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

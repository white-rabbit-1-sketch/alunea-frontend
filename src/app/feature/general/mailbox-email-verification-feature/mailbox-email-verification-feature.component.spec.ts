import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailboxEmailVerificationFeatureComponent } from './mailbox-email-verification-feature.component';

describe('MailboxEmailVerificationFeatureComponent', () => {
  let component: MailboxEmailVerificationFeatureComponent;
  let fixture: ComponentFixture<MailboxEmailVerificationFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailboxEmailVerificationFeatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MailboxEmailVerificationFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

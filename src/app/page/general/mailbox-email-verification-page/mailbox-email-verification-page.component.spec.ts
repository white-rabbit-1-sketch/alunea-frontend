import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailboxEmailVerificationPageComponent } from './mailbox-email-verification-page.component';

describe('MailboxEmailVerificationPageComponent', () => {
  let component: MailboxEmailVerificationPageComponent;
  let fixture: ComponentFixture<MailboxEmailVerificationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailboxEmailVerificationPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MailboxEmailVerificationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

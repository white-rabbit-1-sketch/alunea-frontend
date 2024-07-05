import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailboxRemoveDialogComponent } from './mailbox-remove-dialog.component';

describe('MailboxRemoveDialogComponent', () => {
  let component: MailboxRemoveDialogComponent;
  let fixture: ComponentFixture<MailboxRemoveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailboxRemoveDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MailboxRemoveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

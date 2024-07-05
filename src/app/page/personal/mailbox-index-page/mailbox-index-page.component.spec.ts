import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailboxIndexPageComponent } from './mailbox-index-page.component';

describe('MailboxIndexPageComponent', () => {
  let component: MailboxIndexPageComponent;
  let fixture: ComponentFixture<MailboxIndexPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailboxIndexPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MailboxIndexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailboxListFeatureComponent } from './mailbox-list-feature.component';

describe('MailboxListFeatureComponent', () => {
  let component: MailboxListFeatureComponent;
  let fixture: ComponentFixture<MailboxListFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailboxListFeatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MailboxListFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

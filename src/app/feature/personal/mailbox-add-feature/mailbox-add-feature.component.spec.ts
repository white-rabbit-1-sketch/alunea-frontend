import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailboxAddFeatureComponent } from './mailbox-add-feature.component';

describe('MailboxAddFeatureComponent', () => {
  let component: MailboxAddFeatureComponent;
  let fixture: ComponentFixture<MailboxAddFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailboxAddFeatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MailboxAddFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailboxAliasListFeatureComponent } from './mailbox-alias-list-feature.component';

describe('AliasListFeatureComponent', () => {
  let component: MailboxAliasListFeatureComponent;
  let fixture: ComponentFixture<MailboxAliasListFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailboxAliasListFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailboxAliasListFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

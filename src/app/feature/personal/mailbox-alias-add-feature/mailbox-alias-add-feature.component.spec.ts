import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailboxAliasAddFeatureComponent } from './mailbox-alias-add-feature.component';

describe('AliasAddFeatureComponent', () => {
  let component: MailboxAliasAddFeatureComponent;
  let fixture: ComponentFixture<MailboxAliasAddFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailboxAliasAddFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailboxAliasAddFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

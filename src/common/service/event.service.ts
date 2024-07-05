import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Subdomain} from "../entitiy/domain/subdomain.entity";
import {Mailbox} from "../entitiy/mailbox.entity";
import {Contact} from "../entitiy/contact.entity";
import {MailboxAlias} from "../entitiy/alias/mailbox-alias.entity";
import {ContactAlias} from "../entitiy/alias/contact-alias.entity";

@Injectable({
  providedIn: 'root',
})
export class EventService {
  protected userSigninSubject: Subject<void> = new Subject<void>();
  protected userSignoutSubject: Subject<void> = new Subject<void>();
  protected subdomainAddedSubject: Subject<Subdomain> = new Subject<Subdomain>();
  protected mailboxAddedSubject: Subject<Mailbox> = new Subject<Mailbox>();
  protected mailboxAliasAddedSubject: Subject<MailboxAlias> = new Subject<MailboxAlias>();
  protected mailboxAliasRemovedSubject: Subject<MailboxAlias> = new Subject<MailboxAlias>();
  protected mailboxAliasUpdatedSubject: Subject<MailboxAlias> = new Subject<MailboxAlias>();
  protected contactAliasAddedSubject: Subject<ContactAlias> = new Subject<ContactAlias>();
  protected contactAddedSubject: Subject<Contact> = new Subject<Contact>();

  publishUserSigninEvent(): void {
    this.userSigninSubject.next();
  }

  onUserSignin(): Observable<void> {
    return this.userSigninSubject.asObservable();
  }

  publishUserSignoutEvent(): void {
    this.userSignoutSubject.next();
  }

  onUserSignout(): Observable<void> {
    return this.userSignoutSubject.asObservable();
  }

  publishSubdomainAddedEvent(subdomain: Subdomain): void {
    this.subdomainAddedSubject.next(subdomain);
  }

  onSubdomainAdded(): Observable<Subdomain> {
    return this.subdomainAddedSubject.asObservable();
  }

  publishMailboxAddedEvent(mailbox: Mailbox): void {
    this.mailboxAddedSubject.next(mailbox);
  }

  onMailboxAdded(): Observable<Mailbox> {
    return this.mailboxAddedSubject.asObservable();
  }

  publishMailboxAliasAddedEvent(alias: MailboxAlias): void {
    this.mailboxAliasAddedSubject.next(alias);
  }

  onMailboxAliasAdded(): Observable<MailboxAlias> {
    return this.mailboxAliasAddedSubject.asObservable();
  }

  publishMailboxAliasRemovedEvent(alias: MailboxAlias): void {
    this.mailboxAliasRemovedSubject.next(alias);
  }

  onMailboxAliasRemoved(): Observable<MailboxAlias> {
    return this.mailboxAliasRemovedSubject.asObservable();
  }

  publishMailboxAliasUpdatedEvent(alias: MailboxAlias): void {
    this.mailboxAliasUpdatedSubject.next(alias);
  }

  onMailboxAliasUpdated(): Observable<MailboxAlias> {
    return this.mailboxAliasUpdatedSubject.asObservable();
  }

  publishContactAliasAddedEvent(alias: ContactAlias): void {
    this.contactAliasAddedSubject.next(alias);
  }

  onContactAliasAdded(): Observable<ContactAlias> {
    return this.contactAliasAddedSubject.asObservable();
  }

  publishContactAddedEvent(contact: Contact): void {
    this.contactAddedSubject.next(contact);
  }

  onContactAdded(): Observable<Contact> {
    return this.contactAddedSubject.asObservable();
  }
}

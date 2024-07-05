import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {EventService} from "./event.service";
import {ContactRepository} from "../repository/silvermail/contact.repository";
import {Contact} from "../entitiy/contact.entity";

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(
    protected contactRepository: ContactRepository,
    protected eventService: EventService
  ) {
  }

  public isContactAvailable(userId: string, email: string): Observable<boolean>
  {
    return this.contactRepository.isContactAvailable(userId, email);
  }

  public createContact(userId: string, email: string): Observable<Contact>
  {
    return this.contactRepository.createContact(userId, email).pipe(
      map((contact: Contact) => {
        this.eventService.publishContactAddedEvent(contact);

        return contact;
      })
    );
  }

  public getContactList(userId: string): Observable<Contact[]>
  {
    return this.contactRepository.getContactList(userId);
  }

  public enableContact(contact: Contact): Observable<null>
  {
    return this.contactRepository.enableContact(contact.getId() as string).pipe(
      map(() => {
        contact.setIsEnabled(true);

        return null;
      })
    );
  }

  public disableContact(contact: Contact): Observable<null>
  {
    return this.contactRepository.disableContact(contact.getId() as string).pipe(
      map(() => {
        contact.setIsEnabled(false);

        return null;
      })
    );
  }

  public removeContact(contact: Contact): Observable<null>
  {
    return this.contactRepository.removeContact(contact.getId() as string);
  }
}

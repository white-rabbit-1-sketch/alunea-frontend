import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {ContactClient} from "../../client/silvermail/contact.client";
import {ContactMapper} from "./mapper/entity/contact.mapper";
import {ContactAvailabilityResponseDto} from "../../dto/client/silvermail/contact/contact-availability-response.dto";
import {Contact} from "../../entitiy/contact.entity";
import {ContactResponseDto} from "../../dto/client/silvermail/contact/contact-response.dto";
import {ContactDto} from "../../dto/client/silvermail/contact/entity/contact.dto";
import {ContactListResponseDto} from "../../dto/client/silvermail/contact/contact-list-response.dto";

@Injectable({
  providedIn: 'root'
})
export class ContactRepository {
  constructor(
    protected contactClient: ContactClient,
    protected contactMapper: ContactMapper
  ) {
  }

  public isContactAvailable(userId: string, email: string): Observable<boolean>
  {
    return this.contactClient.isContactAvailable(userId, email).pipe(
      map((contactAvailabilityResponseDto: ContactAvailabilityResponseDto) => (contactAvailabilityResponseDto.getIsAvailable()))
    );
  }

  public createContact(userId: string, email: string): Observable<Contact>
  {
    return this.contactClient.createContact(userId, email).pipe(
      map((contactResponseDto: ContactResponseDto) => {
        if (!contactResponseDto.getContact()) {
          throw new Error('Invalid contact');
        }

        return this.contactMapper.mapContactFromContactDto(
            contactResponseDto.getContact() as ContactDto
        );
      })
    );
  }

  public getContactList(userId: string): Observable<Contact[]>
  {
    return this.contactClient.getContactList(userId).pipe(
      map((contactListResponseDto: ContactListResponseDto) => {
        return this.contactMapper.mapContactListFromContactDtoList(
            contactListResponseDto.getContactList()
        );
      })
    );
  }

  public enableContact(contactId: string): Observable<null>
  {
    return this.contactClient.enableContact(contactId);
  }

  public disableContact(contactId: string): Observable<null>
  {
    return this.contactClient.disableContact(contactId);
  }

  public removeContact(contactId: string): Observable<null>
  {
    return this.contactClient.removeContact(contactId);
  }
}

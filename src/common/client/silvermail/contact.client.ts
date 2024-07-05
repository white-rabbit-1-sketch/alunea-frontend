import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AbstractClient} from "./abstract.client";
import {ContactAvailabilityResponseDto} from "../../dto/client/silvermail/contact/contact-availability-response.dto";
import {ContactResponseDto} from "../../dto/client/silvermail/contact/contact-response.dto";
import {ContactListResponseDto} from "../../dto/client/silvermail/contact/contact-list-response.dto";

@Injectable({
  providedIn: 'root',
})
export class ContactClient extends AbstractClient{
  public isContactAvailable(userId: string, email: string): Observable<ContactAvailabilityResponseDto> {
    return this.get(`/user/${userId}/contact/${email}`).pipe(
      map((response: any) => {
        return this.serializerService.deserialize(response, ContactAvailabilityResponseDto)
      })
    );
  }

  public createContact(
    userId: string,
    email: string
  ): Observable<ContactResponseDto> {
    return this.post(
      `/user/${userId}/contact`,
      {
        email: email
      }
    ).pipe(
      map((response: any) => {
        return this.serializerService.deserialize(response, ContactResponseDto)
      })
    );
  }

  public getContactList(userId: string): Observable<ContactListResponseDto> {
    return this.get(`/user/${userId}/contact`).pipe(
      map((response: any) => {
        return this.serializerService.deserialize(response, ContactListResponseDto)
      })
    );
  }

  public enableContact(
    contactId: string
  ): Observable<null> {
    return this.post(
      `/contact/${contactId}/enable`,
      {}
    ).pipe(
      map(() => {
        return null;
      })
    );
  }

  public disableContact(
    contactId: string
  ): Observable<null> {
    return this.post(
      `/contact/${contactId}/disable`,
      {}
    ).pipe(
      map(() => {
        return null;
      })
    );
  }

  public removeContact(
      contactId: string
  ): Observable<null> {
    return this.delete(
      `/contact/${contactId}`,
    ).pipe(
      map(() => {
        return null;
      })
    );
  }
}

import {Injectable} from '@angular/core';
import {ContactDto} from "../../../../dto/client/silvermail/contact/entity/contact.dto";
import {Contact} from "../../../../entitiy/contact.entity";
import {ContactAliasMapper} from "./alias/contact-alias.mapper";

@Injectable({
  providedIn: 'root'
})
export class ContactMapper {
  public mapContactFromContactDto(
      contactDto: ContactDto
  ): Contact {
    const contact = new Contact();
    contact.setId(contactDto.getId());
    contact.setEmail(contactDto.getEmail());
    contact.setIsEnabled(contactDto.getIsEnabled());
    contact.setAliasesCount(contactDto.getAliasesCount());

    return contact;
  }

  public mapContactListFromContactDtoList(
      contactDtoList: ContactDto[]
  ): Contact[] {
    const contactList: Contact[] = [];

    contactDtoList.forEach(contactDto => {
      contactList.push(
        this.mapContactFromContactDto(contactDto)
      );
    });

    return contactList;
  }
}

import {Injectable} from '@angular/core';
import {MailboxDto} from "../../../../dto/client/silvermail/mailbox/entity/mailbox.dto";
import {Mailbox} from "../../../../entitiy/mailbox.entity";

@Injectable({
  providedIn: 'root'
})
export class MailboxMapper {
  public mapMailboxFromMailboxDto(
    mailboxDto: MailboxDto
  ): Mailbox {
    const mailbox = new Mailbox();
    mailbox.setId(mailboxDto.getId());
    mailbox.setEmail(mailboxDto.getEmail());
    mailbox.setIsEmailVerified(mailboxDto.getIsEmailVerified());
    mailbox.setIsFavorite(mailboxDto.getIsFavorite());
    mailbox.setIsEnabled(mailboxDto.getIsEnabled());
    mailbox.setAliasesCount(mailboxDto.getAliasesCount());

    return mailbox;
  }

  public mapMailboxListFromMailboxDtoList(
    mailboxDtoList: MailboxDto[]
  ): Mailbox[] {
    const mailboxList: Mailbox[] = [];

    mailboxDtoList.forEach(mailboxDto => {
      mailboxList.push(
        this.mapMailboxFromMailboxDto(mailboxDto)
      );
    });

    return mailboxList;
  }
}

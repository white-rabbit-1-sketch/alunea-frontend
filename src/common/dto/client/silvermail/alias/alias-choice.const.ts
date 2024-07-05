import {AliasTypeContact, AliasTypeMailbox} from "../../../../enum/alias-type.enum";
import {MailboxAliasDto} from "./entity/mailbox-alias.dto";
import {ContactAliasDto} from "./entity/contact-alias.dto";

export const AliasChoice = (alias: any) => {
  let result = null;

  if (alias['type'] == AliasTypeMailbox) {
    result = MailboxAliasDto;
  } else if (alias['type'] == AliasTypeContact) {
    result = ContactAliasDto;
  }

  return result;
};

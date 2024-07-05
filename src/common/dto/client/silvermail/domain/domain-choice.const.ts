import {DomainTypeCustom, DomainTypeSubdomain, DomainTypeSystem} from "../../../../enum/domain-type.enum";
import {SystemDomainDto} from "./entity/system-domain.dto";
import {CustomDomainDto} from "./entity/custom-domain.dto";
import {SubdomainDto} from "./entity/subdomain.dto";

export const DomainChoice = (alias: any) => {
  let result = null;

  if (alias['type'] == DomainTypeSystem) {
    result = SystemDomainDto;
  } else if (alias['type'] == DomainTypeCustom) {
    result = CustomDomainDto;
  } else if (alias['type'] == DomainTypeSubdomain) {
    result = SubdomainDto;
  }

  return result;
};

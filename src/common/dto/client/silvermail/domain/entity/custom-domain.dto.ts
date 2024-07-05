import { JsonObject } from 'typescript-json-serializer';
import {AbstractUserDomainDto} from "./abstract-user-domain.dto";

@JsonObject()
export class CustomDomainDto extends AbstractUserDomainDto {

}

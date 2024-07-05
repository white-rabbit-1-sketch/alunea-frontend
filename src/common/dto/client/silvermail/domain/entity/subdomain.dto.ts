import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import {AbstractUserDomainDto} from "./abstract-user-domain.dto";

@JsonObject()
export class SubdomainDto extends AbstractUserDomainDto {
  @JsonProperty()
  protected subdomain: string | null = null;

  public getSubdomain(): string | null {
    return this.subdomain;
  }

  public setSubdomain(subdomain: string | null): void {
    this.subdomain = subdomain;
  }
}

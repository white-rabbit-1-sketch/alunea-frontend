import {AbstractUserDomain} from "./abstract-user-domain.entity";

export class Subdomain extends AbstractUserDomain {
  protected subdomain: string | null = null;

  public getSubdomain(): string | null {
    return this.subdomain;
  }

  public setSubdomain(subdomain: string | null): void {
    this.subdomain = subdomain;
  }
}

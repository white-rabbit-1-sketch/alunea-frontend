import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import {AbstractDomainDto} from "../../domain/entity/abstract-domain.dto";
import {DomainChoice} from "../../domain/domain-choice.const";
import {MailboxDto} from "../../mailbox/entity/mailbox.dto";

@JsonObject()
export class UserDto {
  @JsonProperty()
  protected id: string | null = null;
  @JsonProperty()
  protected email: string | null = null;
  @JsonProperty()
  protected isEmailVerified: boolean = false;
  @JsonProperty({type: DomainChoice})
  protected favoriteDomain: AbstractDomainDto | null = null;
  @JsonProperty({type: MailboxDto})
  protected favoriteMailbox: MailboxDto | null = null;
  @JsonProperty()
  protected language: string | null = null;

  public getId(): string | null {
    return this.id;
  }

  public setId(id: string | null) {
    this.id = id;
  }

  public getEmail(): string | null {
    return this.email;
  }

  public setEmail(email: string | null) {
    this.email = email;
  }

  public getIsEmailVerified(): boolean {
    return this.isEmailVerified;
  }

  public setIsEmailVerified(isEmailVerified: boolean) {
    this.isEmailVerified = isEmailVerified;
  }

  public getFavoriteDomain(): AbstractDomainDto | null {
    return this.favoriteDomain;
  }

  public setFavoriteDomain(favoriteDomain: AbstractDomainDto | null): void {
    this.favoriteDomain = favoriteDomain;
  }

  public getFavoriteMailbox(): MailboxDto | null {
    return this.favoriteMailbox;
  }

  public setFavoriteMailbox(favoriteMailbox: MailboxDto | null): void {
    this.favoriteMailbox = favoriteMailbox;
  }

  public getLanguage(): string | null {
    return this.language;
  }

  public setLanguage(language: string | null) {
    this.language = language;
  }
}

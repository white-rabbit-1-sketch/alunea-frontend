import {AbstractDomain} from "./domain/abstract-domain.entity";
import {Mailbox} from "./mailbox.entity";

export class User {
  protected id: string | null = null;
  protected email: string | null = null;
  protected isEmailVerified: boolean = false;
  protected favoriteDomain: AbstractDomain | null = null;
  protected favoriteMailbox: Mailbox | null = null;
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

  public getFavoriteDomain(): AbstractDomain | null {
    return this.favoriteDomain;
  }

  public setFavoriteDomain(favoriteDomain: AbstractDomain | null): void {
    this.favoriteDomain = favoriteDomain;
  }

  public getFavoriteMailbox(): Mailbox | null {
    return this.favoriteMailbox;
  }

  public setFavoriteMailbox(favoriteMailbox: Mailbox | null): void {
    this.favoriteMailbox = favoriteMailbox;
  }

  public getLanguage(): string | null {
    return this.language;
  }

  public setLanguage(language: string | null) {
    this.language = language;
  }
}

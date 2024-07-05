import {Injectable} from "@angular/core";
import {TokenMapper} from "../mapper/entity/token.mapper";
import {AbstractRepository} from "./abstract.repository";
import {Token} from "../../entitiy/token.entity";

@Injectable({
  providedIn: 'root'
})
export class SecurityRepository extends AbstractRepository {
  protected static readonly TOKEN_STORAGE_KEY = 'user:auth-token';
  constructor(
    protected tokenMapper: TokenMapper
  ) {
    super();
  }

  public saveToken(token: Token): void
  {
    this.set(SecurityRepository.TOKEN_STORAGE_KEY, token.getValue());
  }

  public removeToken(): void
  {
    this.remove(SecurityRepository.TOKEN_STORAGE_KEY);
  }

  public getToken(): Token | null
  {
    let token: Token | null = null;
    const tokenValue: string | null = this.get(SecurityRepository.TOKEN_STORAGE_KEY);
    if (tokenValue) {
      token = this.tokenMapper.mapTokenFromTokenValue(tokenValue);
    }

    return token;
  }
}

import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {SecurityClient} from "../../client/silvermail/security.client";
import {AuthTokenResponseDto} from "../../dto/client/silvermail/security/auth-token-response.dto";
import {Token} from "../../entitiy/token.entity";
import {TokenMapper} from "../mapper/entity/token.mapper";

@Injectable({
  providedIn: 'root'
})
export class SecurityRepository {
  constructor(
    protected securityClient: SecurityClient,
    protected tokenMapper: TokenMapper
  ) {
  }

  public createUserAuthToken(email: string, password: string): Observable<Token>
  {
    return this.securityClient.createUserAuthToken(email, password).pipe(
      map((authTokenResponseDto: AuthTokenResponseDto) => {
        if (!authTokenResponseDto.getToken()) {
          throw new Error('Invalid token');
        }

        return this.tokenMapper.mapTokenFromTokenValue(authTokenResponseDto.getToken() as string);
      }
    ));
  }
}

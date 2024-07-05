import {Injectable} from '@angular/core';
import { jwtDecode } from "jwt-decode";
import {Token} from "../../../entitiy/token.entity";

@Injectable({
  providedIn: 'root'
})
export class TokenMapper {
  public mapTokenFromTokenValue(
    tokenValue: string
  ): Token {
    const payload = jwtDecode(tokenValue);

    const token = new Token();
    token.setValue(tokenValue);
    token.setSub(payload.sub ?? null);
    token.setExp(payload.exp ?? null);

    return token;
  }
}

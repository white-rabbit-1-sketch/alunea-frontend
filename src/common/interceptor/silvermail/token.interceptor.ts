import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import {EnvironmentService} from "../../service/environment.service";
import {SecurityService} from "../../service/security.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    protected securityService: SecurityService,
    protected environmentService: EnvironmentService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith(this.environmentService.getParameterList().silvermail.api.host)) {
      const token = this.securityService.getAuthenticatedUserToken();

      if (token) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token.getValue()}`
          }
        });
      }
    }

    return next.handle(req);
  }
}

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import {EMPTY, Observable, of, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {EnvironmentService} from "../service/environment.service";
import {FlashMessageService} from "../service/flash-message.service";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    protected environmentService: EnvironmentService,
    protected flashMessageService: FlashMessageService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        //let result = new Observable<never>;
        let result = of();
        if (httpErrorResponse.status == 400 || httpErrorResponse.status == 429 || httpErrorResponse.status == 401 || httpErrorResponse.status == 403) {
          this.flashMessageService.showWarnMessage(httpErrorResponse.error.error);
        } else {
          result = throwError(() => httpErrorResponse);
        }

        return result;
      })
    );
  }
}

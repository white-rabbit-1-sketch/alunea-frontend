import { ApplicationConfig, ErrorHandler } from '@angular/core';
import {provideRouter, withInMemoryScrolling, withRouterConfig} from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptorsFromDi, withFetch, HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpErrorInterceptor} from "../common/interceptor/http-error.interceptor";
import {ErrorHandler as AppErrorHandler} from "../common/handler/error.handler";
import {TokenInterceptor} from "../common/interceptor/silvermail/token.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled'})
    ),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptorsFromDi(),
      withFetch(),
    ),
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: ErrorHandler, useClass: AppErrorHandler},
  ]
};

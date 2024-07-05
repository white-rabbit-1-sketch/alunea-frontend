import { Injectable, ErrorHandler as BaseErrorHandler } from '@angular/core';
import {FlashMessageService} from "../service/flash-message.service";
import {EnvironmentService} from "../service/environment.service";
import * as Sentry from "@sentry/angular-ivy";

@Injectable()
export class ErrorHandler implements BaseErrorHandler {
  constructor(
    protected flashMessageService: FlashMessageService,
    protected environmentService: EnvironmentService
  ) {}

  handleError(error: any): void {
    console.error(error);

    let errorMessage = $localize `An unexpected error occurred. Please try refreshing the application.`;
    if (!this.environmentService.isProduction()) {
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
    }

    if (typeof error === 'undefined') {
      error = new Error('An unknown error occurred');
    }

    if (typeof error === 'string') {
      error = new Error(error);
    }

    Sentry.captureException(error);
    this.flashMessageService.showWarnMessage(errorMessage);
  }
}

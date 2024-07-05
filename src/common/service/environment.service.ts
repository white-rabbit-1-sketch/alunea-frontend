import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  protected static readonly ENV_DEV = 'dev';
  protected static readonly ENV_PROD = 'prod';

  public isProduction(): boolean {
    return environment.env == EnvironmentService.ENV_PROD;
  }

  public isDev(): boolean {
    return environment.env == EnvironmentService.ENV_DEV;
  }

  public getParameterList() {
    return environment;
  }
}

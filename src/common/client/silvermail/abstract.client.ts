import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {AbstractHttpClient} from "../abstract-http.client";
import {EnvironmentService} from "../../service/environment.service";
import {Injectable} from "@angular/core";
import {SerializerService} from "../../service/serializer.service";

@Injectable({
  providedIn: 'root',
})
export abstract class AbstractClient extends AbstractHttpClient {
  constructor(
    httpClient: HttpClient,
    environmentService: EnvironmentService,
    protected serializerService: SerializerService
  ) {
    super(httpClient, environmentService.getParameterList().silvermail.api.host);
  }

  public override get(
    uri: string,
    headerList: HttpHeaders = new HttpHeaders()
  ): Observable<any> {
    return super.get(uri, headerList);
  }

  public override post(
    uri: string,
    data: any,
    headerList: HttpHeaders = new HttpHeaders()
  ): Observable<any> {
    headerList.append('Content-Type', 'application/json');

    return super.post(uri, data, headerList);
  }

  public override patch(
    uri: string,
    data: any,
    headerList: HttpHeaders = new HttpHeaders()
  ): Observable<any> {
    headerList.append('Content-Type', 'application/json');

    return super.patch(uri, data, headerList);
  }

  public override delete(
    uri: string,
    headerList: HttpHeaders = new HttpHeaders()
  ): Observable<any> {
    return super.delete(uri, headerList);
  }
}

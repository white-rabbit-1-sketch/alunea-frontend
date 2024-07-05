import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class AbstractHttpClient {
  constructor(
    protected httpClient: HttpClient,
    protected host: string
  ) {}

  public get(
    uri: string,
    headerList: HttpHeaders = new HttpHeaders()
  ): Observable<any> {
    return this.httpClient.get<any>(
      `${this.host}${uri}`,
      {
        headers: headerList
      }
    );
  }

  public post(
    uri: string,
    data: any,
    headerList: HttpHeaders = new HttpHeaders()
  ): Observable<any> {
    return this.httpClient.post<any>(
      `${this.host}${uri}`,
      data,
      {
        headers: headerList
      }
    );
  }

  public patch(
    uri: string,
    data: any,
    headerList: HttpHeaders = new HttpHeaders()
  ): Observable<any> {
    return this.httpClient.patch<any>(
      `${this.host}${uri}`,
      data,
      {
        headers: headerList
      }
    );
  }

  public delete(
    uri: string,
    data: any,
    headerList: HttpHeaders = new HttpHeaders()
  ): Observable<any> {
    return this.httpClient.delete<any>(
      `${this.host}${uri}`,
      {
        headers: headerList
      }
    );
  }
}

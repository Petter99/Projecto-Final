import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiRequest } from '../models/api-request.model';
import { ApiResponse } from '../models/api-response.model';
import { HttpMethod } from '../models/http-method.enum';

@Injectable({
  providedIn: 'root'
})
export class ApiTesterService {
  constructor(private http: HttpClient) {}

  executeRequest(request: ApiRequest): Observable<ApiResponse> {
    const startTime = performance.now();
    const headers = new HttpHeaders(request.headers);
    const options = {
      headers,
      observe: 'response' as const
    };

    let httpCall: Observable<HttpResponse<any>>;

    switch (request.method) {
      case HttpMethod.GET:
        httpCall = this.http.get(request.url, options);
        break;
      case HttpMethod.POST:
        httpCall = this.http.post(request.url, request.body, options);
        break;
      case HttpMethod.PUT:
        httpCall = this.http.put(request.url, request.body, options);
        break;
      case HttpMethod.DELETE:
        httpCall = this.http.delete(request.url, options);
        break;
      case HttpMethod.PATCH:
        httpCall = this.http.patch(request.url, request.body, options);
        break;
      default:
        return throwError(() => new Error('Método HTTP no válido'));
    }

    return httpCall.pipe(
      map((response: HttpResponse<any>) => {
        const endTime = performance.now();
        return {
          statusCode: response.status,
          statusText: response.statusText,
          responseTime: Math.round(endTime - startTime),
          body: response.body,
          headers: this.extractHeaders(response.headers)
        };
      }),
      catchError((error: HttpErrorResponse) => {
        const endTime = performance.now();
        return throwError(() => ({
          statusCode: error.status || 0,
          statusText: error.statusText || 'Error',
          responseTime: Math.round(endTime - startTime),
          body: error.error,
          error: error.message
        }));
      })
    );
  }

  private extractHeaders(headers: any): { [key: string]: string } {
    const headerMap: { [key: string]: string } = {};
    headers.keys().forEach((key: string) => {
      headerMap[key] = headers.get(key);
    });
    return headerMap;
  }
}
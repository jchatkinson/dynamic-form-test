import { Injectable, Input } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'
import { FormlyFieldConfig } from '@ngx-formly/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalcService {
  apiUrl = 'http://localhost:5000/api';
  defaultRPCData = {
    jsonrpc: '2.0', 
    id: 'ngrefs2-1234-1234-1234-1234',
    method: 'test.getForm',
    params: [],
  }

  defaultOptions: IHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http:HttpClient) { }

  getHeader(): Observable<IHeader> {
    const header = {
      company: 'ABC Engineering Ltd.',
      project: '50154-01',
      designer: 'John Doe',
      date: new Date(),
    };
    return of(header);
  }

  getCalc(name: string): Observable<ICalc> {
    let data = this.defaultRPCData;
    return this.http.post<ICalc>(this.apiUrl, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  getSolution(rpcMethod: string, formModel:any): Observable<cRPCResponse> {
    let data = this.defaultRPCData; 
    data.method = rpcMethod;
    data.params = Object.values(formModel);
    console.log(data)
    return this.http.post<cRPCResponse>(this.apiUrl, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
};

}

export class ICalc {
  title: string;
  subtitle: string;
  image: string;
  fields: FormlyFieldConfig[];
  model: Object
  output: string;
  notes: string;
  calcmethod: string; //RPC method to submit form data for solution
}

export class cRPCResponse {
  id: string;
  jsonrpc: string;
  result: any;
}


export interface IHeader {
  company: string;
  designer: string;
  date: Date;
}

export const UNIT_CONVERSIONS = {
  MPa_ksi: 145.0377 / 1000,
  MPa_psi: 145.0377,
  ksi_MPa: 6.894757,
  psi_MPa: 0.006894757,
  in_mm: 25.4,
  mm_in: 1 / 25.4,
};

export interface IHttpOptions {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body' | 'events' | 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
};
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessHTTPMsgService {

  constructor() { }
  
  public handleError(err: HttpErrorResponse | any) {
    let errMsg;
    if(err.error instanceof ErrorEvent) {
      errMsg = err.error.message;
    } else {
      errMsg = `${err.status} - ${err.statusText || ''} - ${err.error}`;
    }
    return throwError(errMsg);
  }
}

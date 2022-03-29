import { Feedback } from '../3. Shared/feedback';
import { baseurl } from '../3. Shared/baseurl';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError , retry } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor( private http: HttpClient,
    private PrcsHttpMsgSrv: ProcessHTTPMsgService ) {}

  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(baseurl + 'feedback/')
    .pipe(catchError(this.PrcsHttpMsgSrv.handleError));
  }
  postFeedback(feedback:Feedback): Observable<Feedback> {
    const httpOption = { headers: new HttpHeaders({'Content-Type':'application/json', Authorization: 'my-auth-token'}) };
    return this.http.post<Feedback>(baseurl + 'feedback/' , feedback , httpOption)
    .pipe(catchError(this.PrcsHttpMsgSrv.handleError));
  }
}

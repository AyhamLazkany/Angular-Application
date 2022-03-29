import { Leader } from '../3. Shared/leader';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseurl } from '../3. Shared/baseurl';
import { map , catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
    private PrcsHttpMsgSrv: ProcessHTTPMsgService ) { }
  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseurl + 'leaders').
    pipe(catchError(this.PrcsHttpMsgSrv.handleError));
  }
  getLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(baseurl + 'leaders' + id).
    pipe(catchError(this.PrcsHttpMsgSrv.handleError));
  }
  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(baseurl + 'leaders?featured=true').
    pipe(map(promotion => promotion[0])).
    pipe(catchError(this.PrcsHttpMsgSrv.handleError));
  }
}

import { Leader } from '../3. Shared/leader';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseurl } from '../3. Shared/baseurl';
import { map , catchError, delay } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
    private PrcsHttpMsgSrv: ProcessHTTPMsgService ) { }
  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseurl + 'leadership').
    pipe(catchError(this.PrcsHttpMsgSrv.handleError),delay(1000));
  }
  getLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(baseurl + 'leadership' + id).
    pipe(catchError(this.PrcsHttpMsgSrv.handleError),delay(1000));
  }
  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(baseurl + 'leadership?featured=true').
    pipe(map(promotion => promotion[0])).
    pipe(catchError(this.PrcsHttpMsgSrv.handleError),delay(1000));
  }
}

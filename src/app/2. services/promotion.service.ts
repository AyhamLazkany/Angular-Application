import { Promotion } from '../3. Shared/promotion';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseurl } from '../3. Shared/baseurl';
import { map , catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  promotion!:Promotion;

  constructor(private http:HttpClient,
    private PrcsHttpMsgSrv: ProcessHTTPMsgService ) { }
  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseurl + 'promotions').
    pipe(catchError(this.PrcsHttpMsgSrv.handleError));
  }
  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseurl + 'promotions' + id).
    pipe(catchError(this.PrcsHttpMsgSrv.handleError));
  }
  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(baseurl + 'promotions?featured=true').
    pipe(map(promotion => promotion[0])).
    pipe(catchError(this.PrcsHttpMsgSrv.handleError));
  }
}

import { Dish } from '../3. Shared/dish';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseurl } from '../3. Shared/baseurl';
import { map , catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  dish!: Dish;

  constructor( private http: HttpClient,
    private PrcsHttpMsgSrv: ProcessHTTPMsgService ) {}
  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseurl + 'dishes').
    pipe(catchError(this.PrcsHttpMsgSrv.handleError));
  }
  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(baseurl + 'dishes/' + id).
    pipe(catchError(this.PrcsHttpMsgSrv.handleError));
  }
  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseurl + 'dishes?featured=true').
    pipe(map(dishes => dishes[0])).
    pipe(catchError(this.PrcsHttpMsgSrv.handleError));
  }
  getDishIDs(): Observable<string[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id))).
    pipe(catchError(err => err));
  }
  putDish(dish: Dish): Observable<Dish> {
    const httpOption = { headers: new HttpHeaders({'Content-Type':'application/json'}) };
    return this.http.put<Dish>(baseurl + 'dishes/' + dish.id, dish, httpOption).
    pipe(catchError(this.PrcsHttpMsgSrv.handleError));
  }
}

import { Injectable } from '@angular/core';
import { Promotion } from '../3. Shared/promotion';
import { Promotions } from '../3. Shared/promotions';
import { of , Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  promotion!:Promotion;

  constructor() { }
  // Simulate server latency with 2 second delay
  getPromotions(): Observable<Promotion[]> {
    return of(Promotions).pipe(delay(2000));
  }
  getPromotion(id: string): Observable<Promotion> {
    return of(Promotions.filter((Promotion) => ( Promotion.id === id ))[0]).pipe(delay(2000));
  }
  getFeaturedPromotion(): Observable<Promotion> {
    return of(Promotions.filter((Promotion) => Promotion.featured )[0]).pipe(delay(2000));
  }
}

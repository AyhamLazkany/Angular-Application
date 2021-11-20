import { Injectable } from '@angular/core';
import { Promotion } from '../3. Shared/promotion';
import { Promotions } from '../3. Shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  promotion!:Promotion;

  constructor() { }
  // Simulate server latency with 2 second delay
  getPromotions(): Promise<Promotion[]> {
    return new Promise(
      resolve => {
        setTimeout(() => resolve(Promotions) , 2000)
      }
    );
  }
  getPromotion(id: string): Promise<Promotion> {
    return new Promise (
      resolve => {
        setTimeout(() => resolve(Promotions.filter((Promotion) => ( Promotion.id === id ))[0]) , 2000)
      }
    );
  }
  getFeaturedPromotion(): Promise<Promotion> {
    return new Promise(
      resolve => {
        setTimeout(() => resolve(Promotions.filter((Promotion) => Promotion.featured )[0]) ,  2000)
      }
    );
  }
}

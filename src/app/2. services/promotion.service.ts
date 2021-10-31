import { Injectable } from '@angular/core';
import { Promotion } from '../3. Shared/promotion';
import { Promotions } from '../3. Shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  promotion!:Promotion;

  constructor() { }
  getPromotions(): Promotion[] {
    return Promotions;
  }
  getPromotion(id: string): Promotion {
    return Promotions.filter((Promotion) => ( Promotion.id === id ))[0];
  }
  getFeaturedPromotion(): Promotion {
    return Promotions.filter((Promotion) => Promotion.featured )[0];
  }
}

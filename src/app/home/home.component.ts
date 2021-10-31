import { Component, OnInit } from '@angular/core';
import { Promotion } from '../3. Shared/promotion';
import { PromotionService } from '../2. services/promotion.service';
import { Dish } from '../3. Shared/dish';
import { DishService } from '../2. services/dish.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish!:Dish;
  promotion!:Promotion;

  constructor(private promotionService: PromotionService,
    private dishService: DishService) { }

  ngOnInit(): void {
    this.dish = this.dishService.getFeaturedDish();
    this.promotion = this.promotionService.getFeaturedPromotion();
  }

}

import { Component, OnInit } from '@angular/core';
import { Promotion } from '../3. Shared/promotion';
import { PromotionService } from '../2. services/promotion.service';
import { Dish } from '../3. Shared/dish';
import { DishService } from '../2. services/dish.service';
import { Leader } from '../3. Shared/leader';
import { LeaderService } from '../2. services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish!:Dish;
  promotion!:Promotion;
  leader!:Leader;

  constructor(private promotionService: PromotionService,
    private dishService: DishService,
    private leaderService: LeaderService) { }

  ngOnInit(): void {
    this.dishService.getFeaturedDish().then(dish => this.dish = dish);
    this.promotionService.getFeaturedPromotion().then(prom => this.promotion = prom);
    this.leaderService.getFeaturedLeader().then(lead => this.leader = lead);
  }

}

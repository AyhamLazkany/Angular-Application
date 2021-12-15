import { Component, OnInit, Inject, inject } from '@angular/core';
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
  dishErrMsg!: string;
  promotion!:Promotion;
  promotionErrMsg!: string;
  leader!:Leader;
  leaderErrMsg!: string;

  constructor(private promotionService: PromotionService,
    private dishService: DishService,
    private leaderService: LeaderService,
    @Inject('BaseURL') public BaseURL: any) { }

  ngOnInit(): void {
    this.dishService.getFeaturedDish().subscribe(dish => this.dish = dish,
      errmsg => this.dishErrMsg = <any>errmsg );
    this.promotionService.getFeaturedPromotion().subscribe(prom => this.promotion = prom,
      errmsg => this.promotionErrMsg = <any>errmsg);
    this.leaderService.getFeaturedLeader().subscribe(lead => this.leader = lead,
      errmsg => this.leaderErrMsg = <any>errmsg);
  }

}

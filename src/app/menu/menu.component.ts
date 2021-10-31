import { Component, OnInit } from '@angular/core';
import { Dish } from '../3. Shared/dish';
import { DishService } from '../2. services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes!: Dish[];
  theDish!: Dish ;

  constructor(private dishService: DishService) { }

  ngOnInit(): void {
    this.dishes = this.dishService.getDishes();
  }
  onSelect(dish : Dish){
    this.theDish = dish;
  }

}

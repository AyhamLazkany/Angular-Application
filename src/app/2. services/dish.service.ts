import { Injectable } from '@angular/core';
import { Dishes } from '../3. Shared/dishes';
import { Dish } from '../3. Shared/dish';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  dish!: Dish;

  constructor() { }
  getDishes(): Dish[] {
    return Dishes;
  }
  getDish(id: string): Dish {
    return Dishes.filter((dish) => ( dish.id === id ))[0];
  }
  getFeaturedDish(): Dish {
    return Dishes.filter((dish) => dish.featured )[0];
  }
}

import { Injectable } from '@angular/core';
import { Dishes } from '../3. Shared/dishes';
import { Dish } from '../3. Shared/dish';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  dish!: Dish;

  constructor() { }
  // Simulate server latency with 2 second delay
  getDishes(): Promise<Dish[]> {
    return new Promise (
      resolve => {
        setTimeout(() => resolve(Dishes) , 2000);
      }
    );
  }
  getDish(id: string): Promise<Dish> {
    return new Promise (
      resolve => {
        setTimeout(() => resolve(Dishes.filter((dish) => ( dish.id === id ))[0]) , 2000)
      }
    );
  }
  getFeaturedDish(): Promise<Dish> {
    return new Promise (
      resolve => {
        setTimeout(() => resolve(Dishes.filter((dish) => dish.featured )[0]) , 2000)
      }
    );
  }
}

import { Injectable } from '@angular/core';
import { Dishes } from '../3. Shared/dishes';
import { Dish } from '../3. Shared/dish';
import { of , Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  dish!: Dish;

  constructor() { }
  // Simulate server latency with 2 second delay
  getDishes(): Observable<Dish[]> {
    return of(Dishes).pipe(delay(2000));
  }
  getDish(id: string): Observable<Dish> {
    return of(Dishes.filter((dish) => ( dish.id === id ))[0]).pipe(delay(2000));
  }
  getFeaturedDish(): Observable<Dish> {
    return of(Dishes.filter(dish => dish.featured )[0]).pipe(delay(2000));
  }
  getDishIDs(): Observable<string[] | any> {
    return of(Dishes.map(dish => dish.id));
  }
}

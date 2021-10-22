import { Injectable } from '@angular/core';
import { Dishes } from '../Shared/dishes';
import { Dish } from '../Shared/dish';
@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }
  getDishes() : Dish[] {
    return Dishes;
  }
}

import { Component , OnInit , Inject } from '@angular/core';
import { Dish } from '../3. Shared/dish';
import { DishService } from '../2. services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes!: Dish[];
  errMsg!: string;

  constructor(private dishService: DishService ,
    @Inject('BaseURL') public BaseURL: any) { }

  ngOnInit(): void {
    this.dishService.getDishes().subscribe(dishes => this.dishes = dishes ,
      errmsg => this.errMsg = <any>errmsg);
  }

}

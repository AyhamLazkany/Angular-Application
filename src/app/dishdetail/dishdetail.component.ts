import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../3. Shared/dish';
import { DishService } from '../2. services/dish.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  @Input()
  theDish !: Dish;

  constructor(private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.theDish = this.dishService.getDish(id); 
  }
  goBack(): void {
    this.location.back();
  }

}

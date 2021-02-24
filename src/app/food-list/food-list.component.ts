import { Component, OnDestroy, OnInit } from '@angular/core';
import { FoodService } from '../services/food.service';
import { Subscription } from 'rxjs';
import { Food } from '../models/food.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss']
})
export class FoodListComponent implements OnInit, OnDestroy {

  public foods: Food[] = [];
  public part: number;
  public loading: boolean;

  private foodSub: Subscription;
  constructor(
    private foodService: FoodService,
    private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.foodSub = this.foodService.foods$.subscribe(
      (foods) => {
        this.foods = foods;
        this.loading = false;
      }
    );

    this.foodService.getFoods();
  }

  onProductClicked(id: string) {
    this.router.navigate(['/food/' + id]);
  }

  ngOnDestroy() {
    this.foodSub.unsubscribe();
  }
}

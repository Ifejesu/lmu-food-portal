import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Food } from "../models/food.model";
import { API_URL, environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }
  private foods: Food[];
  public foods$ = new Subject<Food[]>();

  async getFoods() {
    await this.http.get(API_URL + '/food/').subscribe(
      (foods: Food[]) => {
        if (foods) {
          this.foods = foods;
          this.emitFoods();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  emitFoods() {
    this.foods$.next(this.foods);
  }

  getFoodById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get(API_URL + '/food/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  addNewFood(food: Food, image: File) {
    console.log(food);
    return new Promise((resolve, reject) => {
      const foodData = new FormData();
      foodData.append('food', JSON.stringify(food));
      foodData.append('image', image, food.name);
      console.log(foodData);
      this.http.post(API_URL + '/food', foodData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyFood(id: string, food: Food, image: File | string) {
    return new Promise((resolve, reject) => {
      let foodData: Food | FormData;
      if (typeof image === 'string') {
        food.imageUrl = image;
        foodData = food;
      } else {
        foodData = new FormData();
        foodData.append('food', JSON.stringify(food));
        foodData.append('image', image, food.name);
      }
      this.http.put(API_URL + '/food/' + id, foodData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  deleteFood(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete(API_URL + '/food/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}

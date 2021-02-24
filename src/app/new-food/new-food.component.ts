import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoodService } from '../services/food.service';
import { Router } from '@angular/router';
import { Food } from '../models/Food.model';
import { mimeType } from '../mime-type.validator';

@Component({
  selector: 'app-new-food',
  templateUrl: './new-food.component.html',
  styleUrls: ['./new-food.component.scss']
})
export class NewFoodComponent implements OnInit {
  public foodForm: FormGroup;
  public loading = false;
  public userId: string;
  public imagePreview: string;
  public errorMessage: string;
  constructor(
    private formBuilder: FormBuilder,
    private foodService: FoodService,
    private router: Router,) { }

  ngOnInit(): void {
    //this.state.mode$.next('form');
    this.foodForm = this.formBuilder.group({
      name: [null, Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      image: [null, Validators.required, mimeType]
    });
    //this.userId = this.auth.userId;
  }

  onSubmit() {
    this.loading = true;
    const food = new Food();
    food.name = this.foodForm.get('name').value;
    food.price = this.foodForm.get('price').value;
    food.imageUrl = '';
    food.quantity = this.foodForm.get('quantity').value;
    console.log(food);
    //thing.userId = this.userId;
    this.foodService.addNewFood(food, this.foodForm.get('image').value).then(
      () => {
        this.foodForm.reset();
        this.loading = false;
        this.router.navigate(['/food-list']);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.foodForm.get('image').patchValue(file);
    this.foodForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if (this.foodForm.get('image').valid) {
        this.imagePreview = reader.result as string;
      } else {
        this.imagePreview = null;
      }
    };
    reader.readAsDataURL(file);
  }

}

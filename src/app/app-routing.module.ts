import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodListComponent } from './food-list/food-list.component';
import { NewFoodComponent } from './new-food/new-food.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path: 'food-list', component: FoodListComponent },
  { path: 'new-food', component: NewFoodComponent },
  { path: 'orders', component: OrdersComponent },
  { path: '', redirectTo: '/orders', pathMatch: 'full' },
  { path: '**', redirectTo: '/orders', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { SearchOrderComponent } from './search-order/search-order.component';

const routes: Routes = [
  {
    path: "",
    component: SearchOrderComponent
  },
  {
    path:"order_detail/:order_number",
    component: OrderDetailComponent
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderDetailRoutingModule { }

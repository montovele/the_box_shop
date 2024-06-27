import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderDetailRoutingModule } from './order-detail-routing.module';
import { SearchOrderComponent } from './search-order/search-order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SearchOrderComponent,
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    OrderDetailRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class OrderDetailModule { }

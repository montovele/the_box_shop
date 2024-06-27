import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CheckoutRoutingModule } from './checkout-routing.module';

import { PaymentSucessComponent } from './pages/payment-sucess/payment-sucess.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { CheckoutComponent } from './checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    PaymentComponent,
    PaymentSucessComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ]
})

export class CheckoutModule { }

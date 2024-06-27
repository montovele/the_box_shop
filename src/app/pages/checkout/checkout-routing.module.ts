import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { PaymentComponent } from './pages/payment/payment.component';
import { PaymentSucessComponent } from './pages/payment-sucess/payment-sucess.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentComponent
  },
  {
    path: 'payment_success',
    component: PaymentSucessComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class CheckoutRoutingModule { }

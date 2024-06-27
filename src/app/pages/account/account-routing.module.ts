import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';
import { AddressComponent } from './pages/address/address.component';
import { DetailsComponent } from './pages/details/details.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { QuotesComponent } from './pages/quotes/quotes.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: 'details',
        component: DetailsComponent
      },
      {
        path: 'address',
        component: AddressComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'quotes',
        component: QuotesComponent
      },
      {
        path: '**',
        redirectTo: 'details'
      }
    ]
  }, 
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AccountRoutingModule { }

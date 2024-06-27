import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { AccountComponent } from '../pages/account/account.component';
import { AuthGuard } from '../shared/_guards/auth.guard';
import { HomeComponent } from '../pages/home/home.component';
import { ProdDetailComponent } from '../pages/prod-detail/prod-detail.component';
import { UsersComponent } from '../pages/users/users.component';
import { CartComponent } from '../pages/cart/cart.component';
import { ProductsComponent } from '../pages/products/products.component';
import { ContactComponent } from '../pages/contact/contact.component';
import { TermsConditionsComponent } from '../pages/terms-conditions/terms-conditions.component';
import { NoticePrivacyComponent } from '../pages/notice-privacy/notice-privacy.component';
import { UsComponent } from '../pages/us/us.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [AuthGuard]
},
{
    path: 'detalle-producto',
    component: ProdDetailComponent,
    // canActivate: [AuthGuard]
},
{
    path: 'users',
    component: UsersComponent,
    // canActivate: [AuthGuard]
},
{
    path: 'cart',
    component: CartComponent,
    // canActivate: [AuthGuard]
},
{
  path: 'contact',
  component: ContactComponent,
  // canActivate: [AuthGuard]
},
{
  path: 'terminos',
  component: TermsConditionsComponent,
  // canActivate: [AuthGuard]
},
{
  path: 'privacidad',
  component: NoticePrivacyComponent,
  // canActivate: [AuthGuard]
},
{
  path: 'nosotros',
  component: UsComponent,
  // canActivate: [AuthGuard]
},
{
    path: 'products',
    component: ProductsComponent,
    // canActivate: [AuthGuard]
},
{
    path: 'checkout',
    loadChildren: () => import('../pages/checkout/checkout.module').then(m => { return m.CheckoutModule})
},
{
  path: 'order',
  loadChildren: () => import('../pages/order-detail/order-detail.module').then(m => { return m.OrderDetailModule})
},
  {
    path: 'account',
    canActivate: [AuthGuard],
    loadChildren: () => import('../pages/account/account.module').then( m => { return m.AccountModule})
  },
  {
  path: '**',
  redirectTo: 'home'
  }
    ]
    

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports:[
    RouterModule
  ]
})

export class LayoutRoutingModule { }

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {  UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';

// --- guards
import { AuthGuard } from '../shared/_guards/auth.guard';

import { ProdDetailComponent } from './prod-detail/prod-detail.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { NgModule } from '@angular/core';

// export const PAGES_ROUTES: Routes = [
//     {
//         path: 'home',
//         component: HomeComponent,
//         // canActivate: [AuthGuard]
//     },
//     {
//         path: 'detalle-producto',
//         component: ProdDetailComponent,
//         // canActivate: [AuthGuard]
//     },
//     {
//         path: 'users',
//         component: UsersComponent,
//         // canActivate: [AuthGuard]
//     },
//     {
//         path: 'cart',
//         component: CartComponent,
//         // canActivate: [AuthGuard]
//     },
//     {
//         path: 'products',
//         component: ProductsComponent,
//         // canActivate: [AuthGuard]
//     },
//     {
//         path: 'checkout',
//         loadChildren: () => import('./checkout/checkout.module').then(m => { return m.CheckoutModule})
//     },
//     {
//         path: '**',
//         pathMatch: 'full',
//         redirectTo: 'home',
//         // canActivate: [AuthGuard]
//     },
// ];

// @NgModule({
//     imports: [RouterModule.forChild(PAGES_ROUTES)],
//     exports: [RouterModule]
//   })

// export class pagesRoutingModule { }

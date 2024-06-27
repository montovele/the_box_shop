import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainContentComponent } from './layout/main-content/main-content.component';

const routes: Routes = [
  {
    path: 'portal',
    component: MainContentComponent,
    loadChildren: () => import('./layout/layout.module').then((m) => {return m.LayoutModule}),
  },
  {
    path: 'auth',
    loadChildren: () => import('./layout/auth/auth.module').then((m) => {return m.AuthModule}),
  },
  {
    path: '**',
    redirectTo : 'portal'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}),],
  exports: [RouterModule]
})
export class AppRoutingModule { }

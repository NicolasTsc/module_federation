import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';


export const APP_ROUTE: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  // {
  //   path: 'customers',
  //   loadChildren: () => import('mfe1/Module').then(m => m.CustomersModule)
  // },
  // {
  //   path: 'orders',
  //   loadChildren: () => import('mfe2/Module').then(m => m.OrdersModule)
  // },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTE)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

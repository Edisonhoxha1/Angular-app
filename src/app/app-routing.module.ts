import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'product-list', loadChildren: () => import('../app/home-page/home-page-routing.module').then(m => m.HomePageRoutingModule)},
  { path: 'admin', loadChildren: () => import('../app/admin/admin.module').then(m => m.AdminModule) },
  { path: '', loadChildren: () => import('../app/authentitacion/authentitacion.module').then(m => m.AuthentitacionModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

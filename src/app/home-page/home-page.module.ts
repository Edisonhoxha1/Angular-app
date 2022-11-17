import { NgModule } from '@angular/core';
// import { SharedModule } from 'src/app/shared/shared.module';
import {NavbarPageComponent} from "./navbar-page/navbar-page.component";
import {RouterModule, Routes} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {HomePageComponent} from "./home-page.component";
import {MatButtonModule} from "@angular/material/button";
import {AuthGuard} from "../shared/components/authGuard/auth.guard";

const routes: Routes = [
  { path: 'product-list/admin', component: HomePageComponent, canActivate: [AuthGuard], data: { pageAction: 'admin' } },
  { path: 'product-list/user', component: HomePageComponent, canActivate: [AuthGuard], data: { pageAction: 'user' } }
];

@NgModule({
  declarations: [NavbarPageComponent],
  exports: [
    NavbarPageComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
  ]
})

export class HomePageModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import {AddProductsComponent} from "./add-products/add-products.component";

// const routes: Routes = [
//   { path: 'product/add', component: AddProductsComponent },
//   { path: 'product/edit', component: AddProductsComponent },
// ];

@NgModule({
  imports: [
    // RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class AdminRoutingModule {}

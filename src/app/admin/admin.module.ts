import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {AddProductsComponent} from "./add-products/add-products.component";
import {RouterModule, Routes} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthGuard} from "../shared/components/authGuard/auth.guard";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';

const routes: Routes = [
  // { path: '', component: AddProductsComponent, canActivate: [AuthGuardGuard] },
  { path: 'add-product', component: AddProductsComponent, canActivate: [AuthGuard] },
  { path: 'add-product/edit/:Id', component: AddProductsComponent, canActivate: [AuthGuard], data: { pageAction: 'edit' }},
  { path: 'add-product/add', component: AddProductsComponent, canActivate: [AuthGuard], data: { pageAction: 'add' }}
];

@NgModule({
  declarations: [
    AddProductsComponent
  ],
  imports: [
    // CommonModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTableModule,
    RouterModule.forChild(routes),
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, /* optional */
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ]
})

export class AdminModule {}

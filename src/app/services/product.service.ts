import { Injectable } from '@angular/core';
import {ProductModel} from "../shared/components/models/product.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  ProductListSubject = new BehaviorSubject<ProductModel>({});

  constructor() { }

  getProducts(): ProductModel[]{
    return JSON.parse(<string>localStorage.getItem('productsList'));
  }

  addToCartSubject(ProductDetails: any){
    this.ProductListSubject.next(ProductDetails)
  }

  getCartValue(){
    return this.ProductListSubject.asObservable();
  }


  updateProduct(prod: any) {
    let allProducts = this.getProducts();
    let productUpdated = allProducts.map((p) => {
      if(p.id == prod.id) {
        return prod
      }
      return p;
    });
    localStorage.setItem('productsList', JSON.stringify(productUpdated));
  }


}

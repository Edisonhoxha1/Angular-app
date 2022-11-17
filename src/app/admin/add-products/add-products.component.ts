import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { UUID } from 'angular2-uuid';
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  productsForm!: FormGroup;
  products: any = [];
  pageActionData: any;
  productId: any;
  productUpdate: any = [];

  constructor(public formBuilder: FormBuilder,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              private productService: ProductService) {
    this.productsForm = this.formBuilder.group({
      id : new FormControl(UUID.UUID(), Validators.required),
      ProductName : new FormControl('', Validators.required),
      DtProduct: new FormControl('', Validators.required),
      Price: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.pageActionData = (this.activatedRoute.snapshot.data)['pageAction'];

    if(this.pageActionData == 'edit') {
      this.getParamsProduct()
    }
  }

  addProduct() {
    if(this.productsForm.invalid)
      return this.productsForm.markAllAsTouched();

    if(localStorage.getItem('productsList') === null){
      this.products = [];
    } else {
      this.products = JSON.parse(<string>localStorage.getItem('productsList'))
    }
    this.products.push(this.productsForm.value);
    localStorage.setItem('productsList', JSON.stringify(this.products));
    this.router.navigate(['product-list/admin']);
  }

  getParamsProduct() {
    this.activatedRoute.params.subscribe(data => {
      this.productId = data;
    });

    if(this.productId){
      this.productUpdate = this.productService.getProducts();
      for(let i = 0; i < this.productUpdate.length; i++){
        if(this.productUpdate[i].id == this.productId.Id) {
          this.productsForm.get('id')?.setValue(this.productUpdate[i].id);
          this.productsForm.get('ProductName')?.setValue(this.productUpdate[i].ProductName);
          this.productsForm.get('DtProduct')?.setValue(this.productUpdate[i].DtProduct);
          this.productsForm.get('Price')?.setValue(this.productUpdate[i].Price);
        }
      }
    }

  }

  updateProduct() {
    this.productService.updateProduct(this.productsForm.value)
    this.router.navigate(['product-list/admin']);
  }

}

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductModel} from "../../shared/components/models/product.model";
import {ProductService} from "../../services/product.service";

export interface DialogData {
  detailsElement: ProductModel,
  index: number,
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  ProductDetails: any;

  constructor(public dialogRef: MatDialogRef<DetailsComponent>,
              private productService: ProductService,
              @Inject(MAT_DIALOG_DATA) public dialogData: DialogData) { }

  ngOnInit(): void {
    this.ProductDetails = this.dialogData.detailsElement;
    console.log(this.ProductDetails)
  }

  addToCart(){
    this.productService.addToCartSubject(this.ProductDetails);
    this.dialogRef.close();
  }

  closeModal(){
    this.dialogRef.close();
  }
}

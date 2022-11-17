import { Component, OnInit } from '@angular/core';
import {ProductModel} from "../../shared/components/models/product.model";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ComfirmationPopupComponent} from "../../shared/components/comfirmation-popup/comfirmation-popup.component";
import {filter, take} from "rxjs";
import {DetailsComponent} from "../../user/details/details.component";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageActionData: string;
  list: ProductModel[] = [];
  dataSource: MatTableDataSource<ProductModel> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'ProductName', 'DtProduct', 'price', 'edit', 'remove'];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private matDialog: MatDialog,
              private productService: ProductService,
              public activatedRoute: ActivatedRoute,) {
    this.pageActionData = (route.snapshot.data)['pageAction']
  }

  ngOnInit(): void {
    this.getProductList();

    if(this.pageActionData != 'admin') {
      this.displayedColumns = ['id', 'ProductName', 'DtProduct', 'price', 'details'];
    }
  }

  getProductList() {
    this.list = this.productService.getProducts();
    this.dataSource = new MatTableDataSource(this.list);
  }

  addProduct() {
    this.router.navigate(["admin/add-product/add"]);
  }

  updateProduct(row: any) {
    this.router.navigate([`admin/add-product/edit/${row.id}`]);
  }

  deleteProduct(index: any) {
    this.matDialog
      .open(ComfirmationPopupComponent, {
        data: {
          question: 'Do you want to delete this product?'
        }
      })
      .afterClosed()
      .pipe(
        filter((confirm) => confirm),
        take(1)
      )
      .subscribe(() => {
        this.list.splice(index, 1);
        localStorage.setItem('productsList', JSON.stringify(this.list));
        this.dataSource = new MatTableDataSource(this.list);
      })
  }

  detailsDialog(element: number) {
    this.matDialog
      .open(DetailsComponent, {
        data: {
          detailsElement: element,
        }
      })
      .afterClosed()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

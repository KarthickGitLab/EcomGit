import { Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };
export const compare = (v1: number, v2: number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
import { Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ReturnStatement } from '@angular/compiler';
import { Product } from '../models/product';
import { AppService } from '../app.service';
import { Guid } from 'guid-typescript';
import { DatePipe } from '@angular/common';
export interface SortEvent {
  column: string;
  direction: SortDirection;
}
@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})

export class NgbdSortableHeader {
  @Input() sortable: string | null = null;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();
  model: any = {};

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}
@Component({
  selector: 'app-product-builder',
  templateUrl: './product-builder.component.html',
  styleUrls: ['./product-builder.component.css']
})
export class ProductBuilderComponent implements OnInit {
  // variables declaration
  currentPage = 1;
  pageSize = 5;
  csearchTerm: string = "";
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  model: any = {};

  currentIntent: string = "Create Product";
  product: Product = {
    Name: '',
    SkuCode: '',
    ImageUrl: '',
    Price: 0,
    IsActive: true,
    ProductId: Guid.createEmpty(),
    CreatedBy: '',
    UpdatedBy: '',
    CreatedOn: new Date(),
    UpdatedOn: new Date()
  };;
  productList: Product[]=[];

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.clearObject();
    this.pageSize = 5;
    this.loadProductList();
    let emptyGuid = Guid.createEmpty();
    this.currentIntent = this.product.ProductId.toString() != emptyGuid.toString() ? "Update Product" : "Create Product";
    console.log(this.currentIntent);
  }
  //#region Clear Object
  clearObject() {
    this.product = {
      Name: '',
      SkuCode: '',
      ImageUrl: '',
      Price: 0,
      IsActive: true,
      ProductId: Guid.createEmpty(),
      CreatedBy: '',
      UpdatedBy: '',
      CreatedOn: new Date(),
      UpdatedOn : new Date()
    };
  }
  //#endRegion

  //#region Load Product List
  loadProductList() {
    debugger;
    this.appService.GetProductList().toPromise().then((data: any) => {
      let jsonData: any = JSON.parse(data);
      this.productList = jsonData ? jsonData : [];
    }, (err) => { console.error("Product Builder Component loadProductList Method Exceptpion : " + err); this.productList = [];  });
  }
  //#endregion

  //#region Add or Update Product
  addUpdateProduct(product: Product): any {
    this.appService.AddUpdateProduct(product).toPromise().then((data: any) => {
      let jsonData: any = JSON.parse(data);
      this.product = null;
    }, (err) => { console.error("Product Builder Component addUpdateProduct Method Exceptpion : "+ err); });
  }
  //#endregion

  //#region Add or Update Product
  getProductById(id: Guid): any {
    this.appService.GetProductById(id).toPromise().then((data: any) => {
      let jsonData: any = JSON.parse(data);
      this.product = jsonData;
    }, (err) => { console.error("Product Builder Component getProductById Method Exceptpion : "+ err); });
  }
  //#endregion
  onSubmit() {
    alert('SUCCESS!! :-)\n\n');
  }
}

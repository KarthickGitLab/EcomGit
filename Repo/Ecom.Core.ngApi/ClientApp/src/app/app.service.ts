import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Guid } from 'guid-typescript';
import { Product } from './models/product';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private headers: HttpHeaders;
    private baseUrl: string = ``;

    constructor(private http: HttpClient,  @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl;
         this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': null });
        // var authHeader = this.userInfo.authService.authorizationHeader();
        // this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': authHeader });
    }

    //#region Get Product List
    public GetProductList(){
        try{
          return this.http.get(this.baseUrl + 'api/Product/GetProductList', { headers: this.headers });
        }catch(e){throw e;}
    }
    //#endregion

  //#region Get Product By Id
  public GetProductById(id:Guid) {
      try {
        return this.http.get(this.baseUrl + 'api/Product/GetProductById' + '?userId=' + id + '', { headers: this.headers });
      } catch (e) { throw e; }
    }
    //#endregion

  //#region Delete Product By Id
  public DeleteProductById(id: Guid) {
    try {
      return this.http.delete(this.baseUrl + 'api/Product/DeleteProductById' + '?userId=' + id + '', { headers: this.headers });
    } catch (e) { throw e; }
  }
    //#endregion

  //#region Add or Update Product
  public AddUpdateProduct(product: Product) {
    try {
      return this.http.post(this.baseUrl + 'api/Product/AddUpdateProduct', product, { headers: this.headers });
    } catch (e) { throw e; }
  }
    //#endregion
}

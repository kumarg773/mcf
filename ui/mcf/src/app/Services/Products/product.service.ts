import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

const getProductList ='services/api/Product/Product';
const getProductPricingList ='services/api/Product/ProductPricing';
const getProductCurrencyList ='services/api/Product/ProductCurrency';
const getProductVarientList ='services/api/Product/ProductVarient';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: Http) { }

  private extractPosts(res: Response) {
    if(res.statusText == "No Content"){
      return [];
    }
    return res.text() ? res.json() : {};
  }

  getProductList():Observable<any>{
    return this.http.get(getProductList,null)
    .map(this.extractPosts);
  }

  getProductPricingList():Observable<any>{
    return this.http.get(getProductPricingList,null)
    .map(this.extractPosts);
  }

  getProductCurrencyList():Observable<any>{
    return this.http.get(getProductCurrencyList,null)
    .map(this.extractPosts);
  }

  getProductVarientList():Observable<any>{
    return this.http.get(getProductVarientList,null)
    .map(this.extractPosts);
  }

  addProduct(data: any):Observable<any>{
    let headers = new Headers({'Content-Type': 'application/json'});
    let body =JSON.stringify(data);
    let options = new RequestOptions({ headers: headers});
    return this.http.post(getProductList, body, options)
      .map(this.extractPosts);
  }

  addProductPricing(data: any):Observable<any>{
    let headers = new Headers({'Content-Type': 'application/json'});
    let body =JSON.stringify(data);
    let options = new RequestOptions({ headers: headers});
    return this.http.post(getProductPricingList, body, options)
      .map(this.extractPosts);
  }

  addProductCurrency(data: any):Observable<any>{
    let headers = new Headers({'Content-Type': 'application/json'});
    let body =JSON.stringify(data);
    let options = new RequestOptions({ headers: headers});
    return this.http.post(getProductCurrencyList, body, options)
      .map(this.extractPosts);
  }

  addProductVarient(data: any):Observable<any>{
    let headers = new Headers({'Content-Type': 'application/json'});
    let body =JSON.stringify(data);
    let options = new RequestOptions({ headers: headers});
    return this.http.post(getProductVarientList, body, options)
      .map(this.extractPosts);
  }

}

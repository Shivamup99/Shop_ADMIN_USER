import { environment } from './../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.baseUrl
  constructor(private http:HttpClient) { }

  getProducts(categoriesFilter?: string[]):Observable<Product[]> {
    let params = new HttpParams();
    if(categoriesFilter){
      params = params.append('categories',categoriesFilter.join(','))
     // console.log(params)
    }
    return this.http.get<Product[]>(`${this.baseUrl}/products`,{params:params})
  }

  createProduct(productData:FormData):Observable<Product>{
    return this.http.post<Product>(`${this.baseUrl}/products`,productData)
  }

  getProduct(productId:string):Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products/${productId}`)
  }

  updateProduct(productData:FormData,productId:string):Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/products/${productId}`,productData)
  }


  deleteProduct(productId:string):Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/products/${productId}`)
  }

  getFeatureProduct(count:number):Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products/get/featured/${count}`)
  }
}

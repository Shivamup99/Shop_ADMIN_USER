import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl = environment.baseUrl
  constructor(private http:HttpClient) { }

  getOrderCount(){
    return this.http.get(`${this.baseUrl}/order/get/count`)
  }
  getTotalOrderSale(){
    return this.http.get(`${this.baseUrl}/order/get/total`)
  }
  getProductCount(){
    return this.http.get(`${this.baseUrl}/products/get/count`)
  }
  getCustomerCount(){
    return this.http.get(`${this.baseUrl}/user/count`)
  }
}

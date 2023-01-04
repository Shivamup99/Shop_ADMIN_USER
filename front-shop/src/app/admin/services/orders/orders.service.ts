import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  baseUrl = environment.baseUrl
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private http:HttpClient) { }

  getOrders():Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/order`)
  }

  getOrder(orderId:string):Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/order/${orderId}`)
  }


  deleteOrder(productId:string):Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/order/${productId}`)
  }

  updateOrder(orderStatus:{status:string},orderId:string):Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}/order/${orderId}`,orderStatus)
  }
}

import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  baseUrl = environment.baseUrl
  constructor(private http:HttpClient) { }

  updateGallery(productData:FormData,productId:string):Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/products/gallery/${productId}`,productData)
  }

  getGallery(){

  }

}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import {environment} from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  // baseurl = 'http://localhost:5000/api/category'
  baseUrl=environment.baseUrl

  constructor(private http:HttpClient) { }

  getCategories(categoriesFilter?:string[]):Observable<Category[]> {

    return this.http.get<Category[]>(`${this.baseUrl}/category`)
  }

  getCategory(categoryId:string):Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/category/${categoryId}`)
  }

  createCategories(category:Category):Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/category`,category)
  }

  deleteCategory(categoryId:string):Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/category/${categoryId}`)
  }

  updateCategory(category:Category):Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/category/${category.id}`,category)
  }
}

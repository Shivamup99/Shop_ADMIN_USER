import { environment } from './../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl


  constructor(private http:HttpClient) {
    // for difinig th country data
    // countryLib.registerLocale(require("i18n-iso-countries/langs/en.json"))
  }

  getUsers():Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/user/get`)
  }

  getUser(userId:string):Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/get/${userId}`)
  }

  createUser(user:User):Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/user/register`,user)
  }

  deleteUser(userId:string):Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/user/delete/${userId}`)
  }

  updateUser(user:User):Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/user/update/${user.id}`,user)
  }

  //not working
  // getCountries():{id:string,name:string}[] {
  //   return Object.entries(countryLib.getNames('en',{select:'official'})).map((entry:any)=>{
  //     return{
  //       id:entry[0],
  //       name:entry[1]
  //     }
  //   })
  // }

  // getCountry(countryKey:string):string{
  //   return countryLib.getName(countryKey,'en');
  // }

}

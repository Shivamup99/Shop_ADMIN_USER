import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { LocalStorageService } from '../local/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseurl = 'http://localhost:5000/api/user'
  constructor(private http:HttpClient,private localStorageService:LocalStorageService,private router:Router) { }

  login(email:string,password:string):Observable<User>{
    return this.http.post<User>(`${this.baseurl}/login`,{email:email,password:password})
  }
  logout(){
    this.localStorageService.removeItemFromLocalStorage();
    this.router.navigate(['/login'])
  }
}

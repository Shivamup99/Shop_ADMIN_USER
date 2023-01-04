import { LocalStorageService } from '../local-storage.service';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Authgaurd implements CanActivate{

  constructor(private router:Router,private localStorageToken:LocalStorageService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = this.localStorageToken.getItemFromLocalStorage()
    if(token){
      const decodeToken = JSON.parse(atob(token.split('.')[1]));
     // console.log(decodeToken)
      if(decodeToken.isAdmin && !this._tokenExpired(decodeToken.exp)){
        return true;
      } else{
        this.router.navigate(['/home'])
        return false
      }
      //return true
    } else{
      this.router.navigate(['/login'])
      return false;
    }
  }
  private _tokenExpired(expre: number):boolean{
    return Math.floor(new Date().getTime()/1000) >= expre
  }
}

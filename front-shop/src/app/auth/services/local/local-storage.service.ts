/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  setItemToLocalStorage(data: string){
    localStorage.setItem('token',data)
  }
  getItemFromLocalStorage():any{
    return localStorage.getItem('token')
  }
  removeItemFromLocalStorage(){
    return localStorage.removeItem('token')
  }
}


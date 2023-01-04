import { environment } from './../../../../../environments/environment.prod';

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private localStorageService:LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.localStorageService.getItemFromLocalStorage();
    const isApiUrl= request.url.startsWith(environment.baseUrl);
    if(token && isApiUrl){
      request = request.clone({
        setHeaders:{
          authorization:`Bearer ${token}`
        }
      })
    }
    return next.handle(request);
  }
}

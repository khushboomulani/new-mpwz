import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from 'angular-web-storage';
import { Observable } from 'rxjs';
import {TokengerneratorService} from './tokengernerator.service';

@Injectable({
  providedIn: 'root'
})
export class MyInterceptorService {
  constructor( private token:TokengerneratorService,private session:SessionStorageService) { }
  //function which will be called for all http calls
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token1 = this.token.getAuthToken();
    let newHeaders = req.headers;
    if (token1) {
      newHeaders = newHeaders.append('Authorization', token1);
    }
    const authReq = req.clone({headers: newHeaders});
    return next.handle(authReq);
  }
}

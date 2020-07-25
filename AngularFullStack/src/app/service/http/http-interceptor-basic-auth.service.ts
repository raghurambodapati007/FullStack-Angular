
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor{

  constructor(private basicAuthenticationService:BasicAuthenticationService){ }

  intercept(request: HttpRequest<any>, next: HttpHandler){

      let basicAuthHeaderString=this.basicAuthenticationService.getAuthenticatedToken();
      let username = this.basicAuthenticationService.getAuthenticatedUser();

      console.log("HttpInterceptor "+ basicAuthHeaderString);
      console.log("username "+username);

      if(basicAuthHeaderString && username){
        
        request = request.clone({
               setHeaders : {
                   Authorization : basicAuthHeaderString
                }
        })
      }  
    return next.handle(request);
  }


}
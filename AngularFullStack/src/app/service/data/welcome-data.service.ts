import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class HelloWorldBean {
  constructor(public message:string){ }
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private http:HttpClient
  ) { }

  executeHelloWorldBeanService() {
    return this.http.get<HelloWorldBean>('http://localhost:9090/hello-world-bean');
  }
  
  executeHelloWorldServiceWithPathVariable(name) {
  
    /*let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();
    let headers = new HttpHeaders(
      {Authorization:basicAuthHeaderString}
    )*/
     
    return this.http.get<HelloWorldBean>(
      `http://localhost:9090/hello-world/pathVariable/${name}`,
      //{headers : headers}
      );
  }

   /*createBasicAuthenticationHttpHeader() {
     let username = 'in28minutes'
     let password = 'dummy'
     let basicAuthHeaderString = 'Basic ' +window.btoa(username + ':' + password);
     return basicAuthHeaderString;
   }*/

}
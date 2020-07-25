import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../app.constants';


export const TOKEN= 'token';

export const AUTHENTICATED_USER='authenticatedUser';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }

  /* authenticate(username, password): boolean {
 
     if (username === "Bodapati" && password === '123456') {
       sessionStorage.setItem('authenticatedUser', username);
       return true;
     }
     else {
       return false;
     }
   }*/

   executeJWTAuthenticationService(username, password) {

    return this.http.post<any>(
      `${API_URL}/authenticate`,{
        username,
        password
      }).pipe(
        map(
          data => {
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
            return data;
          }
        )
      );
  }


  executeBasicAuthenticationService(username, password) {

    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);

    console.log(basicAuthHeaderString)
    console.log("username is :" + username)
    console.log("password is :" + password)

    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })

    return this.http.get<AuthenticationBean>(
      `${API_URL}/basicAuth`,
      {headers}).pipe(
        map(
          data => {
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(TOKEN, basicAuthHeaderString);
            return data;
          }
        )
      );
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem(TOKEN);
    }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null)
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }

}

export class AuthenticationBean {
  constructor(public message: string) { }
}
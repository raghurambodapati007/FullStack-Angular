import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() { }

  authenticate(username, password): boolean {
    if (username === "Bodapati" && password === '123456') {
      sessionStorage.setItem('authenticatedUser', username);
      return true;
    }
    else {
      return false;
    }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticatedUser');
    return !(user === null)
  }

  logout(){
    sessionStorage.removeItem('authenticatedUser')
    //return true;
  }
}
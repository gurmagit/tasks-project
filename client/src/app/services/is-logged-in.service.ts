import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInService {
  private token: string = '';
  private isLoggedIn: boolean = false;

  constructor () {}

  isUserLoggedIn = new Subject();
  setIsLoggedIn(loggedIn:boolean) {
    this.isLoggedIn = loggedIn;
    this.isUserLoggedIn.next(loggedIn);
  }

  isAuthenticated() {
    return this.isLoggedIn;
  }
  getToken() {
    return this.token;
  }
  setToken(token:string) {
    this.token = token;
  }
}

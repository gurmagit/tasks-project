import { Injectable } from '@angular/core';
import { User } from '../tasks/task.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IsLoggedInService } from './is-logged-in.service';

const url = 'http://localhost:3030/';
const httpOptions = {headers: new HttpHeaders({
  'Content-Type': 'application/json;charset=utf-8'
})};

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private user = {} as User;

  constructor(
    private isLoggedInService: IsLoggedInService,
    private http: HttpClient,
  ) {}
  token = this.isLoggedInService.getToken();

  getUsers() {
    httpOptions.headers.set('Authorization', 'Bearer ' + this.token);
    return this.http.get(url + 'users/getusers', httpOptions);
  }

  login(username: string, password: string, callback: any) {
    this.user = {username, password}
    this.http.post(url + 'users/login', this.user, httpOptions)
      .subscribe((data:any) => {
        if (data.message === 'success') {
          this.setUser(this.user);
          this.isLoggedInService.setToken(data.token);
          callback('authenticate');
        }
        else {
          callback('not active');
        }
    }, (error) => {
      callback(false)
      console.log(error);
    });
  }

  newUser(user: User, callback: any) {
    this.http.post(url + 'users/register', JSON.stringify(user), httpOptions)
    .subscribe((data: any) => {
      console.log('data:', data);
      callback(data);
    }, (error) => {
      callback(false);
      console.log(error);
    });
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }
}

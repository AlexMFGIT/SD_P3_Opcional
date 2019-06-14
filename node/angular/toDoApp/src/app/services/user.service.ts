import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { User } from '../User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiREST = "http://localhost:3000/api";

  constructor(private http: HttpClient) { }

  userRegister(newUser: User) {
    return this.http.post<User>(`${this.apiREST}/users`, newUser)
      .pipe(map(res=>res));
  }

  userLogin(userData: User) {
    return this.http.post<User>(`${this.apiREST}/sessions`, userData)
      .pipe(map(res=>res));
  }

  static isLoggedIn() {
    if(!localStorage.getItem("userID")) return false;
    else return true;
  }

  static getCurrentUserID() {
    if(!localStorage.getItem("userID")) return '';
    return localStorage.getItem("userID");
  }

  static getCurrentUserName() {
    if(!localStorage.getItem("username")) return '';
    return localStorage.getItem("username");
  }

  static setCurrentUserID(id: string) {
    localStorage.setItem("userID", id);
  }

  static setCurrentUserName(name: string) {
    localStorage.setItem("username", name);
  }

  static userLogout() {
    localStorage.clear();
  }
}

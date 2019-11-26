import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public setUser(data: object) {
    window.localStorage.setItem('user', JSON.stringify(data));
  }

  public getUser() {
    return window.localStorage.getItem('user');
  }

  public removeUser() {
    window.localStorage.removeItem('user');
  }
}

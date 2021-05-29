import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Admin} from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  authenticated = false;
  user: Admin;

  constructor(private http: HttpClient) {
    if (sessionStorage.getItem('role')) {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
  }

  authenticate(credentials, callback): void {
  /*
    const header = new HttpHeaders(credentials ? {
      authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});
*/
    this.http.post<Admin>('http://localhost:8080/login', new Admin(credentials.username, credentials.password, null))
      .subscribe(response => {
        this.user = response;
        console.log(response);
        if (response != null) {
          this.authenticated = true;
          sessionStorage.setItem('username', this.user.username);
          sessionStorage.setItem('role', String(this.user.role));
        } else {
          this.authenticated = false;
        }
        return callback && callback();
      });
  }
}

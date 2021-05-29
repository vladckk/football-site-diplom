import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AppService} from '../../services/app.service';
import {Admin} from '../../models/admin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  username: string;
  role: string;
  // role = 0 -> admin
  // role >= 1 -> user
  constructor(private app: AppService, private http: HttpClient, private router: Router) {
    this.username = sessionStorage.getItem('username');
    this.role = sessionStorage.getItem('role');
    console.log('navigating on ' + this.username);
  }

  logout(): void {
    console.log('logout');
    this.app.authenticated = false;
    sessionStorage.clear();
    window.location.reload();
  }

  authenticated(): boolean {
    return this.app.authenticated;
  }
}

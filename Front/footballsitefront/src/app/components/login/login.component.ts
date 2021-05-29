import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Admin} from '../../models/admin';
import {AppService} from '../../services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  name = new FormControl('');
  pass = new FormControl('');
  exception: number;
  credentials = {username: '', password: ''};

  constructor(private app: AppService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.name = new FormControl('');
    this.pass = new FormControl('');
  }

  login(): void {
    this.app.authenticate(this.credentials, () => {
      console.log(this.credentials);
      if (this.app.authenticated) {
        this.router.navigateByUrl('/').then(() => {
          window.location.reload();
        });
      }
    });
  }
}

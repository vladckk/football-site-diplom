import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Admin} from '../../models/admin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  name = new FormControl('');
  pass = new FormControl('');
  exception: number;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.name = new FormControl('');
    this.pass = new FormControl('');
  }

  login(): void {
    this.http.post<number>('http://localhost:8080/login', new Admin(this.name.value, this.pass.value)).subscribe(result => {
      this.exception = result;
      console.log(this.exception);
    });
  }

}

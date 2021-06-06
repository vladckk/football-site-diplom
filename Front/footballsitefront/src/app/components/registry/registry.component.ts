import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Admin} from '../../models/admin';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit {

  name = new FormControl('');
  pass1 = new FormControl('');
  pass2 = new FormControl('');
  errorMessage = false;
  error2Passwords = false;
  role = 1;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.name = new FormControl('');
    this.pass1 = new FormControl('');
    this.pass2 = new FormControl('');
    this.errorMessage = false;
    this.error2Passwords = false;
  }

  register(): void {
    if (this.passwordCheck()) {
      this.http.post<number>('http://localhost:8080/registry', new Admin(this.name.value, this.pass1.value, this.role)).subscribe(result => {
        this.role = result;
        if (this.role >= 0) {
          sessionStorage.setItem('username', this.name.value);
          sessionStorage.setItem('role', this.pass1.value);
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        }
      });
    }
  }
  passwordCheck(): boolean {
    if (this.pass1.value === this.pass2.value) {
      this.error2Passwords = false;
      if (this.pass1.value.length > 5) {
        this.errorMessage = false;
        return true;
      } else {
        this.errorMessage = true;
        return false;
      }
    } else {
      this.error2Passwords = true;
      return false;
    }
  }

}

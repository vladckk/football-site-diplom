import { Component, OnInit } from '@angular/core';
import {Coach} from '../../models/coach';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.css']
})
export class CoachesComponent implements OnInit {

  maincoaches: Coach[] = [];
  reservecoaches: Coach[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Coach[]>('http://localhost:8080/api/maincoaches').subscribe(result => {
      this.maincoaches = result;
      console.log(this.maincoaches);
    });
    this.http.get<Coach[]>('http://localhost:8080/api/reservecoaches').subscribe(result => {
      this.reservecoaches = result;
      console.log(this.reservecoaches);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import {Info} from '../../models/info';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  info: Info[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Info[]>('http://localhost:8080/info').subscribe(result => {
      this.info = result;
    });
  }

}

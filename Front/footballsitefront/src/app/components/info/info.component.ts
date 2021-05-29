import { Component, OnInit } from '@angular/core';
import {Info} from '../../models/info';
import {HttpClient, HttpParams} from '@angular/common/http';
import {News} from '../../models/news';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  info: Info[] = [];
  edit = false;
  auth = true;
  newInfo: Info;
  constructor(private http: HttpClient) {
    this.auth = sessionStorage.getItem('role') === '0';
  }

  ngOnInit(): void {
    this.http.get<Info[]>('http://localhost:8080/info').subscribe(result => {
      this.info = result;
    });
  }

  addInfo(): void {
    if (this.edit) {
      console.log('adding ' + this.edit);
      this.http.post('http://localhost:8080/admin/info/add', this.newInfo).subscribe();
      window.location.reload();
      return;
    }
    this.edit = true;
    this.newInfo = new Info();
  }

  deleteInfo(id: string, year: number): void {
    if (confirm('Вы действительно хотите удалить запись о ' + year + ' годе')) {
      const params = new HttpParams().set('id', id);
      this.http.delete('http://localhost:8080/admin/info/delete', {params}).subscribe(() => {
        window.location.reload();
      });
    }
  }

  editInfo(id: string): void {
    this.edit = true;
    const params = new HttpParams().set('id', id);
    this.http.get<Info>('http://localhost:8080/admin/info/get', {params}).subscribe(result => {
      this.newInfo = result;
      console.log(this.newInfo);
    });
  }

  resetForm(): void {
    this.newInfo = new Info();
    this.edit = false;
  }

}

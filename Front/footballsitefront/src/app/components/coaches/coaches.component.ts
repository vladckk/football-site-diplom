import { Component, OnInit } from '@angular/core';
import {Coach} from '../../models/coach';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.css']
})
export class CoachesComponent implements OnInit {

  maincoaches: Coach[] = [];
  reservecoaches: Coach[] = [];
  auth = true;

  constructor(private http: HttpClient) {
    this.auth = sessionStorage.getItem('role') === '0';
  }

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
  deleteCoach(id: string, name: string): void {
    if (confirm('Вы действительно хотите удалить ' + name)) {
      const params = new HttpParams().set('id', id);
      this.http.delete('http://localhost:8080/admin/coach/delete', {params}).subscribe();
      window.location.reload();
    }
  }

}

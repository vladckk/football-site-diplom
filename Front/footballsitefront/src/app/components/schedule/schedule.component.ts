import { Component, OnInit } from '@angular/core';
import {Schedule} from '../../models/schedule';
import {HttpClient} from '@angular/common/http';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  schedule: Schedule[][] = [];
  months: string[] = [];
  tours: string[] = [];
  year = '2020';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.initializeSchedule('Все турниры', this.year);
    const params = new HttpParams().set('year', this.year);
    this.http.get<string[]>('http://localhost:8080/api/schedule/tournaments', {params}).subscribe(result => {
      this.tours = result;
    });
  }
  public selectPill(index: number): void {
    this.initializeSchedule(this.tours[index], this.year);
  }
  public changeSeason(y): void {
    this.year = y;
    console.log(this.year);
    this.tours = [];
    this.schedule = [];
    this.months = [];
    this.initializeSchedule('Все турниры', this.year);
    const params = new HttpParams().set('year', this.year);
    this.http.get<string[]>('http://localhost:8080/api/schedule/tournaments', {params}).subscribe(result => {
      this.tours = result;
    });
  }

  public initializeSchedule(t: string, y: string): void {
    this.schedule = [];
    this.months = [];
    const params = new HttpParams()
      .set('tour', t)
      .set('year', y);
    this.http.get<Schedule[][]>('http://localhost:8080/api/schedule',
      {params}).subscribe(result => {
      for (const arr of result) {
        for (const sched of arr) {
          const d = new Date(sched.date);
          sched.dateString = 'Дата: ' + d.toLocaleDateString('be-BY') + ' Время: '
            + d.toLocaleTimeString('be-BY', {hour: 'numeric', minute: 'numeric'});
        }
        this.schedule.push(arr);
        const d = new Date(arr[0].date);
        const str = d.toLocaleString('be-BY', { month: 'long'});
        this.months.push(str[0].toUpperCase() + str.slice(1));
      }
    });
  }

}

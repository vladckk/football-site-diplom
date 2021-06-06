import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {Schedule} from '../../../models/schedule';

@Component({
  selector: 'app-schedule-edit',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.scss']
})
export class ScheduleEditComponent implements OnInit {

  matchForm = false;
  year: string;
  schedule: Schedule[] = [];
  match: Schedule = new Schedule();
  error = false;
  errorstr = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.year = this.route.snapshot.paramMap.get('year');
    const params = new HttpParams().set('year', this.year);
    this.http.get<Schedule[]>('http://localhost:8080/admin/schedule/get', {params}).subscribe(result => {
      this.schedule = result;
      for (const sched of this.schedule) {
        const d = new Date(sched.date);
        sched.dateString = d.toLocaleDateString() + '<br>' + d.toLocaleTimeString();
      }
    });
  }

  addMatch(): void {
    if (this.matchForm) {
      if (this.match.homeTeam === undefined) {
        this.error = true;
        this.errorstr = 'Домашнаяя команда должна быть указана';
      } else if (this.match.awayTeam === undefined) {
        this.error = true;
        this.errorstr = 'Выездная команда должна быть указана';
      } else if (this.match.tournament === undefined) {
        this.error = true;
        this.errorstr = 'Название турнира должно быть указано';
      } else if (this.match.stadium === undefined) {
        this.error = true;
        this.errorstr = 'Стадион должен быть указан';
      } else if (this.match.date === undefined) {
        this.error = true;
        this.errorstr = 'Дата матча должна быть указана';
        console.log(this.match.date);
      } else if (this.match.score === undefined || this.match.score.length < 3) {
        this.match.score = '-:-';
      }
      if (this.match.score === '-:-') {
        this.match.nextMatch = false;
      }
      if (!this.checkScore()) {
        this.error = true;
        this.errorstr = 'Некорректно указан счёт матча, формат: "0:0"';
      }
      this.error = false;
      console.log(this.match);
      const params = new HttpParams().set('year', String(new Date(this.match.date).getFullYear()));
      this.http.post('http://localhost:8080/admin/schedule/add', this.match, {params}).subscribe(() => {
        window.location.reload();
      });
    }
    this.matchForm = true;
  }

  editMatch(match: Schedule): void {
    this.error = false;
    this.matchForm = true;
    this.match = match;
  }

  reset(): void {
    this.matchForm = false;
    this.match = new Schedule();
    this.error = false;
  }

  checkScore(): boolean {
    if (this.match.score === '-:-') {
      return true;
    }
    const index = this.match.score.indexOf(':');
    if (index === -1) {
      return false;
    }
    const score1 = this.match.score.substring(0, index);
    const score2 = this.match.score.substring(index + 1);
    console.log(score1);
    console.log(score2);
    if (score1.search('\\D') > -1) {
      return false;
    } else if (score2.search('\\D') > -1) {
      return false;
    }
    return true;
  }

  deleteMatch(match: Schedule): void {
    if (confirm('Вы действительно хотите удалить выбранный матч?')) {
      const params = new HttpParams().set('id', match._id).set('year', String(new Date(match.date).getFullYear()));
      this.http.delete('http://localhost:8080/admin/schedule/delete', {params}).subscribe();
      window.location.reload();
    }
  }
}

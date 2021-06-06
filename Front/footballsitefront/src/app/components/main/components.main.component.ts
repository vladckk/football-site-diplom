import { Component, OnInit } from '@angular/core';
import {News} from '../../models/news';
import {Player} from '../../models/player';
import {Season} from '../../models/season';
import {Table} from '../../models/table';
import {Team} from '../../models/team';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-components.main',
  templateUrl: './components.main.component.html',
  styleUrls: ['./components.main.component.css']
})
export class MainComponent implements OnInit {

  title = 'FCSite';

  news: News[] = [];
  goalscorers: Player[] = [];
  goalscorersStats: Season[] = [];
  assistants: Player[] = [];
  assistantsStats: Season[] = [];
  table: Table;
  finedTeams: Team[] = [];
  image: any;
  auth = false;
  year = '2020';
  years = [];

  ngOnInit(): void {
    this.http.get<News[]>('http://localhost:8080/').subscribe(result => {
      this.news = result;
      console.log(this.news);
      this.image = this.news[0].image[0];
    });
    this.http.get<Player[]>('http://localhost:8080/mainPageGoalscorers').subscribe(result => {
      this.goalscorers = result;
      for (const goal of this.goalscorers) {
        for (const season of goal.seasons.filter(season1 => season1.year === 2020)) {
          this.goalscorersStats.push(season);
        }
      }
    });
    this.http.get<Player[]>('http://localhost:8080/mainPageAssistants').subscribe(result => {
      this.assistants = result;
      for (const assist of this.assistants) {
        for (const season of assist.seasons.filter(season1 => season1.year === 2020)) {
          this.assistantsStats.push(season);
        }
      }
    });
    const params = new HttpParams().set('year', this.year);
    this.http.get<Table>('http://localhost:8080/table', {params}).subscribe(result => {
      this.table = result;
      for (const team of this.table.teams) {
        if (team.fine > 0) {
          this.finedTeams.push(team);
        }
      }
    });
    this.http.get<number[]>('http://localhost:8080/table/years').subscribe(result => {
      this.years = result;
      console.log(this.years);
    });
  }

  constructor(private http: HttpClient) {
    this.auth = sessionStorage.getItem('role') === '0';
  }

  changeTable(year): void {
    const params = new HttpParams().set('year', year);
    this.http.get<Table>('http://localhost:8080/table', {params}).subscribe(result => {
      this.table = result;
      console.log(this.table);
      this.finedTeams = [];
      for (const team of this.table.teams) {
        if (team.fine > 0) {
          this.finedTeams.push(team);
        }
      }
    });
  }

  deleteTable(id, tournament): void {
    if (confirm('Вы действительно хотите удалить турнир ' + tournament)) {
      const params = new HttpParams().set('id', id);
      this.http.delete('http://localhost:8080/admin/tournament/delete', {params}).subscribe(() => {
        window.location.reload();
      });
    }
  }
}

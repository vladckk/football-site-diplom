import { Component, OnInit } from '@angular/core';
import {News} from '../../models/news';
import {Player} from '../../models/player';
import {Season} from '../../models/season';
import {Table} from '../../models/table';
import {Team} from '../../models/team';
import {HttpClient} from '@angular/common/http';

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
    this.http.get<Table>('http://localhost:8080/table').subscribe(result => {
      this.table = result;
      for (const team of this.table.teams) {
        if (team.fine > 0) {
          this.finedTeams.push(team);
        }
      }
    });
  }

  constructor(private http: HttpClient) {
    this.auth = sessionStorage.getItem('role') === '0';
  }

}

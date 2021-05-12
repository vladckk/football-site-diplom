import { Component, OnInit } from '@angular/core';
import {Player} from '../../models/player';
import {HttpClient} from '@angular/common/http';
import {PlayerStats} from '../../models/playerstats';
import {Schedule} from '../../models/schedule';
import {TeamStats} from '../../models/teamstats';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  fieldPlayers: PlayerStats[] = [];
  goalkeepers: PlayerStats[] = [];
  matches: Schedule[] = [];
  gomel: TeamStats;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<PlayerStats[]>('http://localhost:8080/api/fieldplayers').subscribe(result => {
      this.fieldPlayers = result;
      console.log(this.fieldPlayers);
    });
    this.http.get<PlayerStats[]>('http://localhost:8080/api/gkStats').subscribe(result => {
      this.goalkeepers = result;
    });
    this.http.get<Schedule[]>('http://localhost:8080/stats/matches').subscribe(result => {
      this.matches = result;
      for (const match of this.matches) {
        match.dateString = new Date(match.date).toLocaleDateString();
      }
      console.log(this.matches);
    });
    this.http.get<TeamStats>('http://localhost:8080/api/gomelstats').subscribe(result => {
      this.gomel = result;
      console.log(result);
    });
  }

}

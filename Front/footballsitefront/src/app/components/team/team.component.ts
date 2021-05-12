import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Player} from '../../models/player';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  goalkeepers: Player[] = [];
  defenders: Player[] = [];
  midfielders: Player[] = [];
  strikers: Player[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Player[]>('http://localhost:8080/api/gks').subscribe(result => {
      this.goalkeepers = result;
      console.log(result);
    });
    this.http.get<Player[]>('http://localhost:8080/api/dfs').subscribe(result => {
      this.defenders = result;
      console.log(result);
    });
    this.http.get<Player[]>('http://localhost:8080/api/mfs').subscribe(result => {
      this.midfielders = result;
      console.log(result);
    });
    this.http.get<Player[]>('http://localhost:8080/api/strs').subscribe(result => {
      this.strikers = result;
      console.log(result);
    });
  }

}

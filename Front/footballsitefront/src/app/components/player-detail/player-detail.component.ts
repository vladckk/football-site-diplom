import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Season} from '../../models/season';
import {Playerinfo} from '../../models/playerinfo';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit {

  player: Playerinfo;
  season: Season;
  chosenSeason: Season;
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const params = new HttpParams().set('id', this.route.snapshot.paramMap.get('id'));
    this.http.get<Playerinfo>('http://localhost:8080/player', {params}).subscribe(result => {
      this.player = result;
      this.player.birthdateString = new Date(this.player.birthdate).toLocaleDateString();
      this.season = this.player.currentSeason;
      this.chosenSeason = this.player.currentSeason;
      console.log(result);
    });
  }
  // tslint:disable-next-line:typedef
  public selectPill(index: number) {
    this.chosenSeason = this.player.seasons[index];
    console.log(this.chosenSeason);
  }

}

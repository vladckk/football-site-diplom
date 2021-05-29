import { Component, OnInit } from '@angular/core';
import {Player} from '../../../models/player';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Season} from '../../../models/season';
import {Binary} from '@angular/compiler';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.scss']
})
export class PlayerEditComponent implements OnInit {

  newPhoto = false;
  edit: boolean;
  player: Player;
  seasons: Season[] = [];
  newSeason: Season = new Season();
  achievements: string[] = [];
  newAchievement: string;
  uploadData: FormData = new FormData();
  imagestr: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    const params = new HttpParams().set('id', this.route.snapshot.paramMap.get('id'));
    this.http.get<Player>('http://localhost:8080/admin/player', {params}).subscribe(result => {
      if (result != null) {
        this.player = result;
        this.imagestr = 'data:image/jpeg;base64,' + this.player.image.data;
        this.seasons = this.player.seasons;
        this.achievements = this.player.achievements;
        this.edit = true;
      } else {
        this.player = new Player();
        this.edit = false;
      }
    });
  }

  appendSeason(): void {
    console.log(this.seasons);
    this.newSeason.goalsconceded = -this.newSeason.goalsconceded;
    this.seasons.push(this.newSeason);
    this.newSeason = new Season();
  }

  deleteSeason(index): void {
    this.seasons.splice(index, 1);
  }

  addAch(): void {
    console.log(this.achievements);
    if (this.achievements == null) {
      this.achievements = new Array(this.newAchievement);
    } else {
      this.achievements.push(this.newAchievement);
    }
    this.newAchievement = '';
  }

  deleteAchievement(index): void {
    this.achievements.splice(index, 1);
  }

  updatePlayer(): void {
    this.player.seasons = this.seasons;
    this.player.achievements = this.achievements;
    this.player.image = null;
    let params = new HttpParams().set('id', this.player._id);
    this.http.post('http://localhost:8080/admin/player/add', this.player,
      {params, responseType: 'text'}).subscribe( result => {
      console.log(result);
      if (this.newPhoto) {
        params = new HttpParams().set('id', result.toString());
        this.http.post('http://localhost:8080/admin/player/image', this.uploadData, {params}).subscribe(() => {
          this.router.navigateByUrl('/team');
        });
      } else {
        this.router.navigateByUrl('/team');
      }
    });
  }

  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.newPhoto = true;
      const file = event.target.files[0];
      this.uploadData.append('image', file, file.name);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.imagestr = reader.result;
      };
    }
  }
}

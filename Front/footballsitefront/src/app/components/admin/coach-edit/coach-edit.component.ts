import { Component, OnInit } from '@angular/core';
import {Player} from '../../../models/player';
import {Season} from '../../../models/season';
import {Coach} from '../../../models/coach';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {readSpanComment} from '@angular/compiler-cli/src/ngtsc/typecheck/src/comments';

@Component({
  selector: 'app-coach-edit',
  templateUrl: './coach-edit.component.html',
  styleUrls: ['./coach-edit.component.scss']
})
export class CoachEditComponent implements OnInit {

  newPhoto = false;
  edit: boolean;
  coach: Coach;
  periods: string[] = [];
  newPeriod: string;
  uploadData: FormData = new FormData();
  imagestr: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
    const params = new HttpParams().set('id', this.route.snapshot.paramMap.get('id'));
    this.http.get<Coach>('http://localhost:8080/admin/coach', {params}).subscribe(result => {
      if (result != null) {
        this.coach = result;
        this.imagestr = 'data:image/jpeg;base64,' + this.coach.image.data;
        this.periods = this.coach.periods;
        this.edit = true;
      } else {
        this.coach = new Coach();
        this.coach.status = 1;
        this.edit = false;
      }
    });
  }
  addCoach(): void {
    this.coach.periods = this.periods;
    this.coach.image = null;
    console.log(this.coach);
    let params = new HttpParams().set('id', this.coach._id);
    this.http.post('http://localhost:8080/admin/coach/add', this.coach, {params, responseType: 'text'})
      .subscribe(result => {
        console.log(result);
        if (this.newPhoto) {
          params = new HttpParams().set('id', result.toString());
          this.http.post('http://localhost:8080/admin/coach/photo', this.uploadData, {params})
            .subscribe(() => {
              this.router.navigateByUrl('/coaches');
            });
        } else {
          this.router.navigateByUrl('/coaches');
        }
      });
  }
  appendPeriod(): void {
    if (this.newPeriod !== '') {
      if (this.periods == null) {
        this.periods = new Array(this.newPeriod);
      } else {
        this.periods.push(this.newPeriod);
      }
      this.newPeriod = '';
      document.getElementById('newperiod').focus();
    }
  }
  deletePeriod(index): void {
    this.periods.splice(index, 1);
  }
  setStatus(event: any): void {
    this.coach.status = event.target["selectedIndex"] + 1;
    console.log(this.coach.status);
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

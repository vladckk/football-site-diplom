import { Component, OnInit } from '@angular/core';
import {News} from '../../../models/news';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.scss']
})
export class NewsEditComponent implements OnInit {

  news: News;
  index = 0;
  imagesNews: string[] = [];
  uploadData: FormData[] = [];
  filenames: any[] = [];
  filedates: any[] = [];
  id: string;
  newPhoto = false;


  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id === 'add') {
      this.news = new News();
    } else {
      const params = new HttpParams().set('id', this.id);
      this.http.get<News>('http://localhost:8080/admin/news', {params}).subscribe(result => {
        this.news = result;
        for (const image of this.news.image) {
          this.imagesNews.push('data:image/jpeg;base64,' + image.data);
        }
      });
    }
  }

  addNews(): void {
    console.log(this.news);
    this.news.image = null;
    let params = new HttpParams().set('id', this.id);
    this.http.post('http://localhost:8080/admin/news/add', this.news, {params, responseType: 'text'}).subscribe(result => {
      console.log(result);
      params = new HttpParams().set('id', result);
      if (this.newPhoto) {
        for (let i = 0; i < this.uploadData.length; i++) {
          console.log('started');
          this.http.post('http://localhost:8080/admin/news/photos', this.uploadData[i], {params}).subscribe(() => {
            if (i === this.uploadData.length - 1) {
              console.log('ended');
            }
          });
        }
      }
      this.router.navigateByUrl('/news');
    });
  }

  deletePhoto(index): void {
    this.newPhoto = true;
    this.imagesNews.splice(index, 1);
    this.uploadData.splice(index, 1);
    this.filenames.splice(index, 1);
    this.filedates.splice(index, 1);
  }

  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (!this.filenames.includes(file.name) && !this.filedates.includes(file.lastModified)) {
        this.newPhoto = true;
        this.filenames.push(file.name);
        this.filedates.push(file.lastModified);
        this.uploadData[this.index] = new FormData();
        this.uploadData[this.index].append('image', file, file.name);
        this.index += 1;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          const imagestr: string = reader.result.toString();
          if (this.imagesNews == null) {
            this.imagesNews = new Array(imagestr);
          } else {
            this.imagesNews.push(imagestr);
          }
        };
      }
    }
  }

}

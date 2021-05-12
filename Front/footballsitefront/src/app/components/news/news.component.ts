import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {News} from '../../models/news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  news: News[] = [];
  indexes: number[] = [];
  count: number;
  index = 0;
  previous = 0;
  step = 2;
  private max: number;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const params = new HttpParams().set('index', String(0)).set('step', String(this.step));
    this.http.get<News[]>('http://localhost:8080/news', {params}).subscribe(result => {
      this.news = result;
      for (let n of this.news) {
        n.dateString = new Date(n.date).toLocaleDateString();
      }
    });
    this.http.get<number>('http://localhost:8080/news/count').subscribe(result => {
      this.count = result;
      this.max = Math.floor(this.count / this.step);
      console.log(this.max);
      let cursor = 0;
      while (cursor <= this.max) {
        this.indexes.push(cursor);
        cursor++;
      }
      console.log(this.indexes);
    });
  }

  public selectPage(i: number): void {
    if (i === -1) {
      this.index = 0;
    } else if (i > this.max) {
      this.index = this.max;
    } else {
      this.index = i;
    }

    const params = new HttpParams().set('index', String(this.index)).set('step', String(this.step));
    this.http.get<News[]>('http://localhost:8080/news', {params}).subscribe(result => {
      this.news = result;
      console.log(this.news);
    });
    this.previous = this.index;
  }

}

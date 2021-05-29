import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {News} from '../../models/news';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {

  url;
  news: News;
  latestNews: News[] = [];
  private id: string;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const params = new HttpParams().set('id', this.route.snapshot.paramMap.get('id'));
    this.http.get<News>('http://localhost:8080/news/id', {params}).subscribe(result => {
      this.news = result;
      this.news.dateString = new Date(this.news.date).toLocaleDateString();
      if (this.news.videolink != null && this.news.videolink.length > 10) {
        this.news.videolink = this.news.videolink.replace('https://www.youtube.com/watch?v=',
          'https://www.youtube.com/embed/');
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.news.videolink);
      }
    });
    this.http.get<News[]>('http://localhost:8080/news/id/latest', {params}).subscribe(result => {
      this.latestNews = result;
      for (const n of this.latestNews) {
        n.dateString = new Date(n.date).toLocaleDateString();
      }
      console.log(this.latestNews);
    });
  }
  public clickOnLink(id: string): void {
    this.id = id;
    const params = new HttpParams().set('id', this.id);
    this.http.get<News>('http://localhost:8080/news/id', {params}).subscribe(result => {
      this.news = result;
      this.news.dateString = new Date(this.news.date).toLocaleDateString();
    });
    this.http.get<News[]>('http://localhost:8080/news/id/latest', {params}).subscribe(result => {
      this.latestNews = result;
      for (const n of this.latestNews) {
        n.dateString = new Date(n.date).toLocaleDateString();
      }
    });
  }

}

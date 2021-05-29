import {Injectable, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { TeamComponent } from './components/team/team.component';
import {MainComponent} from './components/main/components.main.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import {FormsModule} from '@angular/forms';
import { CoachesComponent } from './components/coaches/coaches.component';
import { StatsComponent } from './components/stats/stats.component';
import { PlayerDetailComponent } from './components/player-detail/player-detail.component';
import { NewsComponent } from './components/news/news.component';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';
import { InfoComponent } from './components/info/info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistryComponent } from './components/registry/registry.component';
import { LoginComponent } from './components/login/login.component';
import {AppService} from './services/app.service';
import { PlayerEditComponent } from './components/admin/player-edit/player-edit.component';
import { CoachEditComponent } from './components/admin/coach-edit/coach-edit.component';
import { NewsEditComponent } from './components/admin/news-edit/news-edit.component';
import { ScheduleEditComponent } from './components/admin/schedule-edit/schedule-edit.component';
import { TableEditComponent } from './components/admin/table-edit/table-edit.component';
import {XhrInterceptor} from './XhrInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    MainComponent,
    ScheduleComponent,
    CoachesComponent,
    StatsComponent,
    PlayerDetailComponent,
    NewsComponent,
    NewsDetailComponent,
    InfoComponent,
    RegistryComponent,
    LoginComponent,
    PlayerEditComponent,
    CoachEditComponent,
    NewsEditComponent,
    ScheduleEditComponent,
    TableEditComponent
  ],
    imports: [
        BrowserModule, HttpClientModule, AppRoutingModule, FormsModule, ReactiveFormsModule
    ],
  providers: [AppService, {provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {

}

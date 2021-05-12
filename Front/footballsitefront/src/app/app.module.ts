import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import {HttpClientModule} from '@angular/common/http';
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
import { AdminComponent } from './components/admin/admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistryComponent } from './components/registry/registry.component';
import { LoginComponent } from './components/login/login.component';

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
    AdminComponent,
    RegistryComponent,
    LoginComponent
  ],
    imports: [
        BrowserModule, HttpClientModule, AppRoutingModule, FormsModule, ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

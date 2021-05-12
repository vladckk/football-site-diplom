import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TeamComponent} from './components/team/team.component';
import {MainComponent} from './components/main/components.main.component';
import {ScheduleComponent} from './components/schedule/schedule.component';
import {CoachesComponent} from './components/coaches/coaches.component';
import {StatsComponent} from './components/stats/stats.component';
import {PlayerDetailComponent} from './components/player-detail/player-detail.component';
import {NewsComponent} from './components/news/news.component';
import {NewsDetailComponent} from './components/news-detail/news-detail.component';
import {InfoComponent} from './components/info/info.component';
import {RegistryComponent} from './components/registry/registry.component';
import {LoginComponent} from './components/login/login.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'team', component: TeamComponent},
  {path: 'schedule', component: ScheduleComponent},
  {path: 'coaches', component: CoachesComponent},
  {path: 'statistics', component: StatsComponent},
  {path: 'player/:id', component: PlayerDetailComponent},
  {path: 'news', component: NewsComponent},
  {path: 'news/:id', component: NewsDetailComponent},
  {path: 'info', component: InfoComponent},
  {path: 'registry', component: RegistryComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

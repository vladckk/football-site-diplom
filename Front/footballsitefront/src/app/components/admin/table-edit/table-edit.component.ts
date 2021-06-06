import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Table} from '../../../models/table';
import {Team} from '../../../models/team';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-table-edit',
  templateUrl: './table-edit.component.html',
  styleUrls: ['./table-edit.component.scss']
})
export class TableEditComponent implements OnInit {

  fine = false;
  teamForm = false;
  edit = false;
  addTournament = false;
  editname: string;
  table = new Table();
  newTeam: Team = new Team();
  teams: Team[] = [];
  tournament: string;
  year: number;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const year = this.route.snapshot.paramMap.get('year');
    console.log(year);
    if (year !== 'add') {
      const params = new HttpParams().set('year', year);
      this.http.get<Table>('http://localhost:8080/table', {params}).subscribe(result => {
        this.table = result;
        this.teams = this.table.teams;
        this.tournament = this.table.name;
        this.year = this.table.year;
      });
    } else {
      this.addTournament = true;
      const team = new Team();
      team.name = 'ФК Гомель';
      this.teams.push(team);
    }
  }

  updateTournament(): void {
    this.table.name = this.tournament;
    this.table.year = this.year;
    this.table.teams = this.teams;
    this.http.post('http://localhost:8080/admin/tournament', this.table).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }

  addTeam(): void {
    if (this.teamForm) {
      console.log(this.newTeam);
      if (this.addTournament) {
        this.teams.push(this.newTeam);
        this.newTeam = new Team();
      } else {
        if (this.edit) {
          const params = new HttpParams().set('name', this.editname).set('tournament', this.table.name)
            .set('year', String(this.table.year));
          this.http.post('http://localhost:8080/admin/team/edit', this.newTeam, {params}).subscribe(() => {
            window.location.reload();
          });
        } else {
          const params = new HttpParams().set('year', String(this.table.year)).set('tournament', this.table.name);
          this.http.post('http://localhost:8080/admin/team/add', this.newTeam, {params}).subscribe(() => {
            window.location.reload();
          });
        }
      }
    }
    this.teamForm = true;
  }

  addFine(): void {
    this.fine = true;
  }

  resetFine(): void {
    this.fine = false;
  }

  resetForm(): void {
    this.newTeam = new Team();
    this.teamForm = false;
    this.edit = false;
  }

  editTeam(team: Team): void {
    this.newTeam = team;
    this.editname = this.newTeam.name;
    this.teamForm = true;
    this.edit = true;
  }

  deleteTeam(name: string, index: number): void {
    if (confirm('Вы действительно хотите удалить команду ' + name + '?')) {
      if (this.addTournament) {
        this.teams.splice(index, 1);
      } else {
        const params = new HttpParams().set('name', name).set('year', String(this.table.year)).set('tournament', this.table.name);
        this.http.delete('http://localhost:8080/admin/team/delete', {params}).subscribe(() => {
          window.location.reload();
        });
      }
    }
  }

}

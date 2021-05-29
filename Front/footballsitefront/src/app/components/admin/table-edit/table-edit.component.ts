import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Table} from '../../../models/table';
import {Team} from '../../../models/team';

@Component({
  selector: 'app-table-edit',
  templateUrl: './table-edit.component.html',
  styleUrls: ['./table-edit.component.scss']
})
export class TableEditComponent implements OnInit {

  fine = false;
  teamForm = false;
  edit = false;
  editname: string;
  table: Table;
  newTeam: Team = new Team();
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Table>('http://localhost:8080/table').subscribe(result => {
      this.table = result;
    });
  }

  addTeam(): void {
    if (this.teamForm) {
      console.log(this.newTeam);
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

  deleteTeam(name: string): void {
    if (confirm('Вы действительно хотите удалить команду ' + name)) {
      const params = new HttpParams().set('name', name).set('year', String(this.table.year)).set('tournament', this.table.name);
      this.http.delete('http://localhost:8080/admin/team/delete', {params}).subscribe(() => {
        window.location.reload();
      });
    }
  }

}

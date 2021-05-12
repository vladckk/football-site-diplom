import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Admin} from '../../models/admin';
import {Router} from '@angular/router';
import {MainComponent} from '../main/components.main.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

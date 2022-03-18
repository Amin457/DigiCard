import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { users } from 'src/app/model/user';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  decoded: any;
  user: users ;
  constructor() { }
  ngOnInit() {
  const token=localStorage.getItem('token');
  this.decoded = jwt_decode(token);
  this.user=this.decoded.result;
 }

}

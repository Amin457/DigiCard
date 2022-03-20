import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { users } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  decoded: any;
  user: users ;
  form: FormGroup;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Username: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Email: string;
  password: string;
msg  ='';
http: any;
constructor(public httpClient: HttpClient, private userService: UserService) {

 }

 ngOnInit() {
  const token=localStorage.getItem('token');
  this.decoded = jwt_decode(token);
  this.user=this.decoded.result;
  this.Username=this.user.Nom;
  this.Email=this.user.mail;
  this.password=this.user.mdp;
 }


 onSubmit() {
this.user.Nom=this.Username;
this.user.mdp=this.password;
if(this.user.mdp.length<8 || this.user.Nom.length<2){
  this.msg='mot de passe ou nom non valide';
}else{
  this.userService.updateUser(this.user).subscribe(
     (res)  => {
       this.msg = 'modification avec succées';
     },
     error => {
       this.msg = 'mot de passe ou nom non valide';
     });
    } }
}



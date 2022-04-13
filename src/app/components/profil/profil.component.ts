import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import { ToastController } from '@ionic/angular';
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
  Username: string;
  lastName: string;
  Email: string;
  password: string;
msg  ='';
http: any;
constructor(public httpClient: HttpClient, private userService: UserService ,  public toastController: ToastController) {

 }

 ngOnInit() {
  const token=localStorage.getItem('token');
  this.decoded = jwt_decode(token);
  this.user=this.decoded.result;
  this.Username=this.user.Nom;
  this.lastName=this.user.Prenom;
  this.Email=this.user.mail;
  this.password=this.user.mdp;
 }


 onSubmit() {
this.user.Nom=this.Username;
this.user.mdp=this.password;
this.user.Prenom=this.lastName;
if(this.user.mdp.length<8 || this.user.Nom.length<2){
  this.toastController.create({
    message: 'donnée non valide ressayer !!',
    position: 'bottom',
    cssClass: 'toast-custom-class',
    buttons: [
      {
        side: 'end',
        handler: () => {
          console.log('');
        }
      }, {
        side: 'end',
        text: 'fermer',
        role: 'cancel',
        handler: () => {
          console.log('');
        }
      }
    ]
  }).then((toast) => {
    toast.present();
  });
}else{
  this.userService.updateUser(this.user).subscribe(
     (res)  => {
      {
        this.toastController.create({
          message: 'modification avec succées !!',
          position: 'bottom',
          cssClass: 'toast-custom-class',
          buttons: [
            {
              side: 'end',
              handler: () => {
                console.log('');
              }
            }, {
              side: 'end',
              text: 'fermer',
              role: 'cancel',
              handler: () => {
                console.log('');
              }
            }
          ]
        }).then((toast) => {
          toast.present();
        });
      }
     },
     error => {
       this.msg = 'mot de passe ou nom non valide';
     });
    } }
}



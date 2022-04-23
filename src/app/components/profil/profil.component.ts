import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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
  http: any;
  id:number;
constructor(public httpClient: HttpClient, private userService: UserService ,  public toastController: ToastController) {
  this.initForm(); 

 }

 

 ngOnInit() {
 
 }

 initForm() {
  const token=localStorage.getItem('token');
  this.decoded = jwt_decode(token);
  this.user=this.decoded.result;
  this.id=this.user.id;

  this.form = new FormGroup({
    Nom: new FormControl(this.user.Nom, {validators: [Validators.required]}),
    Prenom: new FormControl(this.user.Prenom, {validators: [Validators.required]}),
    mail: new FormControl(this.user.mail, {validators: [Validators.required, Validators.email]}),
    mdp: new FormControl(this.user.mdp, {validators: [Validators.required, Validators.minLength(8)]}),
  });
}

 onSubmit() {
this.user.id=this.id;
this.user=this.form.value;


  this.userService.updateUser(this.user).subscribe(
     (res)  => {
      {
        console.log(res);
        this.toastController.create({
          message: res.message,
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
       console.log(error);
     });
     }
}



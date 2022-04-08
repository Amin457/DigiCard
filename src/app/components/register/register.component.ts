import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { data } from 'src/app/model/data';
import { users } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  user : users=new users();

  data: data=new data();
  constructor(public toastController: ToastController,public httpClient: HttpClient,private router: Router, private userService: UserService) {
    this.initForm(); 
  }
goto(){
  this.router.navigate(['login']);
}
    ngOnInit() {
    }
   
    initForm() {
      this.form = new FormGroup({
        Nom: new FormControl(null, {validators: [Validators.required]}),
        Prenom: new FormControl(null, {validators: [Validators.required]}),
        mail: new FormControl(null, {validators: [Validators.required, Validators.email]}),
        mdp: new FormControl(null, {validators: [Validators.required, Validators.minLength(8)]}),
      });
    }
    onSubmit() {
    
console.log(this.form.value);
this.user.Nom=this.form.value.Nom;
this.user.Prenom=this.form.value.Prenom;
this.user.mail=this.form.value.mail;
this.user.mdp=this.form.value.mdp;

     this.data.email=this.form.value.mail;
     this.data.firstName=this.form.value.Nom;
     this.data.lastName=this.form.value.Prenom;
     this.data.dbId="RETAIL_TS";  
   


    this.userService.register(this.user).subscribe(
        (res)  => {
          this.userService.createClient(this.data).subscribe(
            (res)  => {console.log("user created at Cegid")});
            
            this.toastController.create({
            message: 'inscription avec succée',
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
        },
        error => {
          this.toastController.create({
            message: 'email déja utilisé',
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
        });
      }

}

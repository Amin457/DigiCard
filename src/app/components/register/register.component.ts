import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
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

 /* data: data=new data();*/
  constructor(private alertCtrl: AlertController,public toastController: ToastController,public httpClient: HttpClient,private router: Router, private userService: UserService) {
    this.initForm(); 
  }
  async presentAlert(msg : string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
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
        dateNaissance: new FormControl(null, {validators: [Validators.required]}),
        mdp: new FormControl(null, {validators: [Validators.required, Validators.minLength(8)]}),
        CIN: new FormControl(null, {validators: [Validators.required, Validators.minLength(8)]}),
      });
    }
    onSubmit() {
    if(this.form.valid){
this.user.Nom=this.form.value.Nom;
this.user.Prenom=this.form.value.Prenom;
this.user.mail=this.form.value.mail;
this.user.mdp=this.form.value.mdp;
this.user.dateNaissance=this.form.value.dateNaissance;
this.user.CIN=this.form.value.CIN;
   this.userService.register(this.user).subscribe(
        (res)  => {
         
          this.presentAlert('Vous etes inscrits');
        },
        error => {
          this.presentAlert('Mail déjà utilisé');
      
        });
      }else{
        this.presentAlert("Vérifier les champs")
      }
      }

}

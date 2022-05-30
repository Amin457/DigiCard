import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { notif } from 'src/app/model/notif';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import jwt_decode from 'jwt-decode';

import { users } from 'src/app/model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  notif : notif= new notif ();
  user: users ;
  form1: FormGroup;
  decoded: any;
  isTypePassword = true;
  constructor(private alertCtrl: AlertController,public toastController: ToastController,public httpClient: HttpClient,public navCtrl: NavController , private router: Router, private userService: UserService) {
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
  ngOnInit() {
  }
  goto(){
    this.router.navigate(['signup']);
  }
  initForm() {
    this.form1 = new FormGroup({
      mail: new FormControl('',
        {validators: [Validators.required, Validators.email]}
      ),
      mdp: new FormControl('',
        {validators: [Validators.required, Validators.minLength(8)]}
      ),
    });
  }
  onChange() {
    this.isTypePassword = !this.isTypePassword;
  }

  onSubmit() {

    if(this.form1.valid) {
      this.form1.markAllAsTouched();
    }
    this.userService.login(this.form1.value).subscribe(
      (res)  => {
        if(res.unauthorised===true){
          console.log(res);
        return false;
      }else{
        localStorage.setItem('token',res.token);
        ///////////////////
    this.decoded = jwt_decode(res.token);
    this.user=this.decoded.result;

      /////////////////////////////////////

      PushNotifications.requestPermissions().then(result => {
        if (result.receive === 'granted') {

          PushNotifications.register();
        } else {
          // Show some error
        }
      });
  
      // On success, we should be able to receive notifications
      PushNotifications.addListener('registration',
        (token: Token) => {
          //this.presentAlert('Push registration success, token: ' + token.value);
          this.notif.token=token.value;
          this.notif.id_client=this.user.id;
          this.userService.registerNotif(this.notif).subscribe(
            (res)  => {
             console.log(res);
            },
            error => {
              console.log(error);
            });
        }
      );
  
      // Some issue with our setup and push will not work
      PushNotifications.addListener('registrationError',
        (error: any) => {
          //this.presentAlert('Error on registration: ' + JSON.stringify(error));
        }
      );
  
      // Show us the notification payload if the app is open on our device
      PushNotifications.addListener('pushNotificationReceived',
        (notification: PushNotificationSchema) => {
          //this.presentAlert('notification: '  + JSON.stringify(notification.title) + JSON.stringify(notification.body));
        }
      );
  
      
      // Method called when tapping on a notification
      PushNotifications.addListener('pushNotificationActionPerformed',
        (notification: ActionPerformed) => {
          //this.presentAlert('Push action performed: ' + JSON.stringify(notification));
        }
      );    


        //////////////////
        this.router.navigate(['main/home']);

        return false;
      }
      },
      error => {
        this.presentAlert('Vérifiez vos coordonnées !!');
      });


  }


}

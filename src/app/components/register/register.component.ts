import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  http: any;
  // eslint-disable-next-line max-len
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
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Nom: new FormControl(null, {validators: [Validators.required]}),
        mail: new FormControl(null, {validators: [Validators.required, Validators.email]}),
        mdp: new FormControl(null, {validators: [Validators.required, Validators.minLength(8)]}),
      });
    }

    onSubmit() {
      if(!this.form.valid) {
        this.form.markAllAsTouched();
        return;
      }
      this.userService.register(this.form.value).subscribe(
        (res)  => {
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
          console.log(this.form.value);
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

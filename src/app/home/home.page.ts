import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  form1: FormGroup;
  isTypePassword = true;
  msg: string;
  constructor(public httpClient: HttpClient,public navCtrl: NavController) {
    this.initForm();
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
    this.httpClient.post<any>('http://localhost:3000/api/users/login',this.form1.value).subscribe(
      (res)  => {
        if(res.success===1){
        console.log(res.message);
        this.msg=res.message;
        this.navCtrl.navigateRoot('/client/'+res.data.id);
        return false;
      }else{
        this.msg=res.data;
        console.log(res.data);
      }
      }
      ,
      error => {
        console.log(error);
      });
  }

}

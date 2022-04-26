import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{

  form1: FormGroup;
  isTypePassword = true;
  constructor(public toastController: ToastController,public httpClient: HttpClient,public navCtrl: NavController , private router: Router, private userService: UserService) {
    this.initForm();
  }
  ngOnInit() {

    localStorage.removeItem('token');
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
        this.router.navigate(['main/home']);
        return false;
      }
      },
      error => {
        alert('email ou mot de passe non valide !!');
      });
  }


}

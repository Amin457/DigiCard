import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
   msg  ='';
  http: any;
  constructor(public httpClient: HttpClient,private router: Router, private userService: UserService) {
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
          this.msg = 'registration successfully';
          console.log(this.form.value);
        },
        error => {
          console.log('email alredy in use', error);
          this.msg = 'Email alredy in use try again';
        });
    }

}

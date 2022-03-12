import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
   form: FormGroup;
   msg  ='';
  http: any;
  constructor(public httpClient: HttpClient) {
      this.initForm();
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
      this.httpClient.post<any>('http://localhost:3000/api/users/',this.form.value).subscribe(
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

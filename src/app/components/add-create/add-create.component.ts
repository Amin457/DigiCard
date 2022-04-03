import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-create',
  templateUrl: './add-create.component.html',
  styleUrls: ['./add-create.component.scss'],
})
export class AddCreateComponent implements OnInit {

  type = true;
  form: FormGroup;
  segmentValue = '1';
  data: any;
  constructor(private router: Router) {
    this.initForm();
  }

  ngOnInit() {
  }

  segmentChanged(event) {
    console.log(event);
    this.segmentValue = event.detail.value;
  }

  initForm() {
    this.form = new FormGroup({
      email1: new FormControl(null, {validators: [Validators.required]}),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Nom1: new FormControl(null, {validators: [Validators.required]}),
      adresse1: new FormControl(null, {validators: [Validators.required]}),
      telephone1: new FormControl(null, {validators: [Validators.required]})
    });
  }

  changeType() {
    this.type = !this.type;
  }

  onSubmit() {
    if(!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
  }

  gotoAddCard(){
    this.router.navigate(['main/newcard']);
  }

}

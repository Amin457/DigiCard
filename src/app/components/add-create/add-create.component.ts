import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

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
  constructor(private router: Router , private barcodeScanner: BarcodeScanner) {
    this.initForm();
  }

  scan() {
    this.data = null;
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.data = barcodeData;
    }).catch(err => {
      console.log('Error', err);
    });
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
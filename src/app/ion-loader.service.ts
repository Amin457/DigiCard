import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class IonLoaderService {

  constructor(public loadingController: LoadingController) { }


 // Simple loader
 simpleLoader() {
  this.loadingController.create({
    message: 'Loading...'
  }).then((response) => {
    response.present();
  });
}
// Dismiss loader
dismissLoader() {
  this.loadingController.dismiss().then((response) => {
    console.log('Loader closed!', response);
  }).catch((err) => {
    console.log('Error occured : ', err);
  });
}
// Auto hide show loader
autoLoader() {
  this.loadingController.create({
    message: "Attender s'il vous plait",
    duration: 4000
  }).then((response) => {
    response.present();
    response.onDidDismiss().then((response) => {
      console.log('Loader dismissed', response);
    });
  });
}   
// Custom style + hide on tap loader
customLoader() {
  this.loadingController.create({
    message: 'Loader with custom style',
    duration: 4000,
    cssClass:'loader-css-class',
    backdropDismiss:true
  }).then((res) => {
    res.present();
  });
}

}

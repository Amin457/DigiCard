import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Config } from 'src/app/model/config';
import { PartenaireService } from 'src/app/services/partenaire.service';
import jwt_decode from 'jwt-decode';
import { users } from 'src/app/model/user';
import { getCard } from 'src/app/model/getCard';
import { CarteService } from 'src/app/services/carte.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { data } from 'src/app/model/data';
import { UserService } from 'src/app/services/user.service';
import { createCard } from 'src/app/model/createCard';
import { IonLoaderService } from 'src/app/ion-loader.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-add-create',
  templateUrl: './add-create.component.html',
  styleUrls: ['./add-create.component.scss'],
})
export class AddCreateComponent implements OnInit {
  decoded: any;
  config: Config = new Config();
  type = true;
  form: FormGroup;
  id_part: number;
  user: users;
  getCard: getCard = new getCard();
  createCard: createCard = new createCard();
  data: data = new data();
  data1: any="";
  CustomerId: string;
  scanActive: boolean = false;
  show = true;
  constructor(private alertCtrl: AlertController, private ionLoaderService: IonLoaderService, public toastController: ToastController, private carteService: CarteService, public route: ActivatedRoute, private router: Router, private partenaireService: PartenaireService, private userService: UserService) {
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
    const token = localStorage.getItem('token');
    this.decoded = jwt_decode(token);
    this.user = this.decoded.result;

    this.id_part = this.route.snapshot.params.id_part;
    this.partenaireService.getConfig(this.id_part).subscribe(
      (res) => {
        this.config = res.results[0];
        console.log(this.config);

      },
      error => {
        console.log(error);
      });



    this.data.firstName = this.user.Nom;
    this.data.lastName = this.user.Prenom
    this.data.id_client = this.user.id;
    this.data.id_part = this.id_part;
    this.data.mail=this.user.mail;
    this.data.BirthDateDay=this.user.dateNaissance.toString().substr(8,2);
    this.data.BirthDateMonth=this.user.dateNaissance.toString().substr(5,2);
    this.data.BirthDateYear=this.user.dateNaissance.toString().substr(0,4);
  console.log(this.data);
  }


  initForm() {
    this.form = new FormGroup({
      cardId: new FormControl(this.data1,{ validators: [Validators.minLength(8)] }),
    });
  }
  
  onChange() {
  }

  ajouter() {
    if(this.form.value.cardId.length<7||this.form.value.cardId==undefined){
      this.presentAlert("vérifier votre numéro de carte");
    }else{
    this.ionLoaderService.autoLoader();
    this.getCard.cardId = this.form.value.cardId;
    this.getCard.id = this.user.id;
    this.getCard.dbId = this.config.dbId;
    this.getCard.id_part = this.id_part;
    this.getCard.StoreId = this.config.storeID;
    console.log(this.getCard);

    this.carteService.GetLoyaltyCard(this.getCard).subscribe(
      (res) => {
        this.ionLoaderService.dismissLoader();
        this.presentAlert(res.message);
      },
      (error) => {
        this.presentAlert("impossible de trouver la carte " + this.getCard.cardId);
      });
    }
  }


  creer() {
  
    this.data.dbId = this.config.dbId;
    this.data.dbId=this.config.dbId;
    this.data.CustomerId=this.user.CIN+this.config.storeID;
    this.data.storeId=this.config.storeID;
    console.log(this.data);
    this.ionLoaderService.autoLoader();
    this.userService.createClient(this.data).subscribe(
      
      (res) => {
        console.log(res.message)
        console.log(res.data)
        this.createCard.storeId = this.config.storeID;
        this.createCard.clientId = this.user.id;
        this.createCard.id_part = this.id_part;
        this.createCard.dbId = this.config.dbId;
        this.createCard.client_ref = res.data;
        console.log(this.createCard);
        this.carteService.createLoyaltyCard(this.createCard).subscribe(
          (res) => {
            console.log(res.message);

            this.ionLoaderService.dismissLoader();
            this.presentAlert(res.message);

          },
          (error) => { console.log(error); }
        );

      },
      (error) => { 
        console.log(error);
        this.presentAlert("Vérifier votre numéro de CIN") 
      }
    );
  
  }

  gotoAddCard() {
    this.router.navigate(['main/newcard']);
  }




  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        BarcodeScanner.openAppSettings();
        resolve(false);
      }
    });
  }

  async startScanner() {
    const allowed = await this.checkPermission();

    if (allowed) {
      this.show = !this.show;
      this.scanActive = true;
      BarcodeScanner.hideBackground();

      const result = await BarcodeScanner.startScan();

      if (result.hasContent) {
        this.scanActive = false;
        this.data1 = result.content;
        this.initForm();
        //The QR content will come out here
        //Handle the data as your heart desires here
        this.stopScanner();
        this.show = !this.show;
      } else {
        this.presentAlert('NO DATA FOUND!');
      }
    } else {
      this.presentAlert('NOT ALLOWED!');
    }
  }

  stopScanner() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

  ionViewWillLeave() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }



}

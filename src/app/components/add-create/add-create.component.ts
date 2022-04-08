import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Config } from 'src/app/model/config';
import { PartenaireService } from 'src/app/services/partenaire.service';
import jwt_decode from 'jwt-decode';
import { users } from 'src/app/model/user';
import { getCard } from 'src/app/model/getCard';
import { CarteService } from 'src/app/services/carte.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-create',
  templateUrl: './add-create.component.html',
  styleUrls: ['./add-create.component.scss'],
})
export class AddCreateComponent implements OnInit {
  decoded: any;
  config : Config=new Config();
  type = true;
  form: FormGroup;
  id_part : number ;
  user: users ;
  getCard : getCard= new getCard();

  constructor(  public toastController: ToastController,private carteService: CarteService,public route: ActivatedRoute,private router: Router, private partenaireService: PartenaireService) {
    this.initForm();
  }

  ngOnInit() {
    const token=localStorage.getItem('token');
    this.decoded = jwt_decode(token);
    this.user=this.decoded.result;

   this.id_part = this.route.snapshot.params.id_part;
   this.partenaireService.getConfig(this.id_part).subscribe(
      (res)  => {
        this.config = res.results[0];
        console.log(this.config);

      },
      error => {
        console.log(error);
      });
   }
  

  initForm() {
    this.form = new FormGroup({
      cardId: new FormControl('', 
      {validators: [Validators.required, Validators.minLength(8)]}
      )
    });
  }

  onChange() {
  }

     ajouter() {
    if(!this.form.valid) return;
    this.getCard.cardId=this.form.value.cardId;
    this.getCard.id=this.user.id;
    this.getCard.dbId=this.config.dbId;
    this.getCard.id_part=this.id_part;
    this.getCard.StoreId=this.config.storeID;
    console.log(this.getCard);

    this.carteService.GetLoyaltyCard(this.getCard).subscribe(
      (res)  => {
        console.log(res.message);
        this.toastController.create({
          message: res.message,
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
      },
      error => {
         this.toastController.create({
          message: "impossible de trouver la carte "+this.getCard.cardId,
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


    creer() {
      
    }

  gotoAddCard(){
    this.router.navigate(['main/newcard']);
  }

}

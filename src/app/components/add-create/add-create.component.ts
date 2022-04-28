import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Config } from 'src/app/model/config';
import { PartenaireService } from 'src/app/services/partenaire.service';
import jwt_decode from 'jwt-decode';
import { users } from 'src/app/model/user';
import { getCard } from 'src/app/model/getCard';
import { CarteService } from 'src/app/services/carte.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { data } from 'src/app/model/data';
import { UserService } from 'src/app/services/user.service';
import { createCard } from 'src/app/model/createCard';
import { IonLoaderService } from 'src/app/ion-loader.service';
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
  createCard : createCard= new createCard();
  data: data=new data();
  data1: any;
  constructor(private ionLoaderService: IonLoaderService, public toastController: ToastController,private carteService: CarteService,public route: ActivatedRoute,private router: Router, private partenaireService: PartenaireService,private userService: UserService) {
    this.initForm();
  }




 /* displayAutoLoader() {
    this.ionLoaderService.autoLoader();
  }
 showLoader() {
    this.ionLoaderService.simpleLoader();
  }
  hideLoader() {
    this.ionLoaderService.dismissLoader();
  }
  customizeLoader() {
    this.ionLoaderService.customLoader();
  }*/
    
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



     this.data.firstName=this.user.Nom;
     this.data.lastName=this.user.Prenom
     this.data.id_client=this.user.id;
     this.data.id_part=this.id_part;
    
   }
  

  initForm() {
    this.form = new FormGroup({
      cardId: new FormControl(this.data1, 
      {validators: [Validators.required, Validators.minLength(8)]}
      )
    });
  }

  onChange() {
  }

     ajouter() {
      if(!this.form.valid) return;
      this.ionLoaderService.autoLoader();
    this.getCard.cardId=this.form.value.cardId;
    this.getCard.id=this.user.id;
    this.getCard.dbId=this.config.dbId;
    this.getCard.id_part=this.id_part;
    this.getCard.StoreId=this.config.storeID;
    console.log(this.getCard);

    this.carteService.GetLoyaltyCard(this.getCard).subscribe(
      (res)  => {
        this.ionLoaderService.dismissLoader();
        alert(res.message);
      },
      (error) => {
        alert("impossible de trouver la carte "+this.getCard.cardId);
      });
  }


    creer() {
      this.ionLoaderService.autoLoader();
      this.data.dbId=this.config.dbId;
    this.userService.createClient(this.data).subscribe(
            (res)  => {console.log(res.message)
                       console.log(res.data)
              this.createCard.storeId=this.config.storeID;
              this.createCard.clientId=this.user.id;
              this.createCard.id_part=this.id_part;
              this.createCard.dbId=this.config.dbId;
              this.createCard.client_ref=res.data;
              console.log(this.createCard);
              this.carteService.createLoyaltyCard(this.createCard).subscribe(
                (res)  => {console.log(res.message);

                  this.ionLoaderService.dismissLoader();
                  alert(res.message);              

                },
                (error)=> {console.log(error);}
                );

            }
            );
    }

  gotoAddCard(){
    this.router.navigate(['main/newcard']);
  }

}

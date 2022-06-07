import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { Reclamation } from 'src/app/model/reclamation';
import { users } from 'src/app/model/user';
import jwt_decode from 'jwt-decode';
import { Boutiques } from 'src/app/model/boutique';
import { BoutiqueService } from 'src/app/services/Boutiques.service';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss'],
})
export class ReclamationComponent implements OnInit {
 id : number;
 id_part: number;
 id_carte: number;
 form: FormGroup;
 Rec: string;
 choix: string;
 rec: Reclamation=new Reclamation();
 user: users ;
  decoded: any;
  Boutiques: Boutiques[]=[] ;
  constructor(private alertCtrl: AlertController,private router: Router,public route: ActivatedRoute ,  public toastController: ToastController ,private reclamationService: ReclamationService , private boutiqueService:BoutiqueService) { }
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
    this.id_carte = this.route.snapshot.params.id1;
    this.id_part = this.route.snapshot.params.id2;
    const token=localStorage.getItem('token');
    this.decoded = jwt_decode(token);
    this.user=this.decoded.result;

    this.boutiqueService.getBoutiques(this.id_part).subscribe(
      (res)  => {
        this.Boutiques=res.data;
        console.log(this.Boutiques);

      },
      error => {
        console.log(error);
      });

  }
  gotoDetail(){
    this.router.navigate(['main/home/detailcard/'+this.id_carte+'/'+this.id_part]);
}

onSelectChange(selectedValue: any) {
  var item = this.Boutiques.find(item => item['id'] === selectedValue);
  var postion = this.Boutiques.findIndex(item => item['id'] === selectedValue);
}
sendRec(){
  if(this.choix===undefined || this.Rec===undefined || this.id===undefined ){
     this.presentAlert('il faut que vous remplir tous le formuliare !');
  }else{

  this.rec.id_client=this.user.id;
  this.rec.id_boutique=this.id;
  this.rec.sujet_rec=this.choix;
  this.rec.description=this.Rec;
  console.log('hhhhhhhhhhhhh',this.rec)
  this.reclamationService.createRec(this.rec).subscribe(
    (res)  => {
  
      this.presentAlert('Votre réclamation a était envoyée');
       
    },
    error => {
      console.log(error);
    });
}
}
}


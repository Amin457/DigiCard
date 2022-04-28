import { Component, OnInit ,ElementRef ,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Carte } from 'src/app/model/carte';
import { users } from 'src/app/model/user';
import { CarteService } from 'src/app/services/carte.service';
import jwt_decode from 'jwt-decode';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { PromotionService } from 'src/app/services/promotion.service';
import { Promo } from 'src/app/model/promo';
import { getPoint } from 'src/app/model/getPoint';
import { Config } from 'src/app/model/config';
import { PartenaireService } from 'src/app/services/partenaire.service';
import { CadeauService } from 'src/app/services/cadeau.service';

@Component({
  selector: 'app-detailcard',
  templateUrl: './detailcard.component.html',
  styleUrls: ['./detailcard.component.scss'],
})
export class DetailcardComponent implements OnInit {
  [x: string]: any;
   decoded: any;
   user: users ;
   id_carte: number;
   id_part: number;
   config : Config=new Config();
   carte1: Carte[];
   value: string; 
  promos: Promo[]=[] ;
  type = true;
  points : string;
  getPoint : getPoint=new getPoint;
  constructor(private cadeauService:CadeauService,private promoService: PromotionService,private router: Router ,public route: ActivatedRoute , private carteService: CarteService, private partenaireService: PartenaireService,private toastCtrl: ToastController) { }

  ngOnInit() {
    const token=localStorage.getItem('token');
    this.decoded = jwt_decode(token);
    this.user=this.decoded.result;

    this.id_carte = this.route.snapshot.params.id1;
    this.id_part = this.route.snapshot.params.id2;

    this.carteService.getCarteById(this.user.id,this.id_carte).subscribe(
    (res)  => {
      this.carte1 = res.data;
      console.log("caaaartee",this.carte1[0].num_carte);
      this.getPoint.cardId=this.carte1[0].num_carte;


      this.partenaireService.getConfig(this.id_part).subscribe(
        (res)  => {
          this.config = res.results[0];
         this.getPoint.dbId=this.config.dbId;

         this.carteService.getPoints(this.getPoint).subscribe(
          (res)  => {
            this.points = res.data;
          },
          error => {
            console.log(error);
          });
        },
        error => {
          console.log(error);
        });




    },
    error => {
      console.log(error);
    });
      
    this.promoService.getPromoByPart(this.id_part).subscribe(
      (res)  => {
        if(res.success===1){
        this.promos=res.data;
        return false;
      }else{
        console.log(res.data);
      }
      }
      ,
      error => {
        console.log(error);
      });
  
     
     
    
    }
onClick1(url: string){
  window.open(url,'_system');
}

rec(){
  this.router.navigate(['main/home/detailcard/'+this.id_carte+'/'+this.id_part+'/reclamation']);
}
feed(){
  this.router.navigate(['main/home/detailcard/'+this.id_carte+'/'+this.id_part+'/feedback']);
}
localisations(){
  this.router.navigate(['main/home/detailcard/'+this.id_carte+'/'+this.id_part+'/localisation']);
}
promopart(){
  this.router.navigate(['main/home/detailcard/'+this.id_carte+'/'+this.id_part+'/promopart']);
}

game(){
  this.cadeauService.getEtatJeux(this.id_part).subscribe(
    (res)  => {
      console.log(res.data)
    if(res.data.etat_jeu==1){
  this.router.navigate(['main/home/detailcard/'+this.id_carte+'/'+this.id_part+'/game']);

    }else{
      alert("cette jeux est desactivé pour le moment");
    }
    },
    error => {
      console.log(error);
    });
}
}

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
   carte1: Carte[];
   value: string; 
  promos: Promo[]=[] ;
  type = true;
  points : string;
  getPoint : getPoint= new getPoint();
  constructor(private promoService: PromotionService,private router: Router ,public route: ActivatedRoute , private carteService: CarteService,private toastCtrl: ToastController) { }

  ngOnInit() {
    const token=localStorage.getItem('token');
    this.decoded = jwt_decode(token);
    this.user=this.decoded.result;

    this.id_carte = this.route.snapshot.params.id1;
    this.id_part = this.route.snapshot.params.id2;

    this.carteService.getCarteById(this.user.id,this.id_carte).subscribe(
    (res)  => {
      this.carte1 = res.data;
    },
    error => {
      console.log(error);
    });


    this.getPoint.cardId="10400000000000044";
    this.getPoint.dbId="RETAIL_TS";

    this.carteService.getPoints(this.getPoint).subscribe(
      (res)  => {
        this.points = res.data;
      },
      error => {
        console.log(error);
      });


    this.promoService.getPromoByPart(this.id_part).subscribe(
      (res)  => {
        if(res.success===1){
        this.promos=res.data;
        console.log(this.promos);
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
}

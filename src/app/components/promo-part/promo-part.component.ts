/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { users } from 'src/app/model/user';
import jwt_decode from 'jwt-decode';
import { PromotionService } from 'src/app/services/promotion.service';
import { Promo } from 'src/app/model/promo';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-promo-part',
  templateUrl: './promo-part.component.html',
  styleUrls: ['./promo-part.component.scss'],
})
export class PromoPartComponent implements OnInit {
  imgUrl = environment.Api + 'api/files/get/';

  decoded: any;
  user: users ;
  id_carte: number;
  id_part: number;
 promos: Promo[]=[] ;
  nom: string;
 constructor(private promoService: PromotionService,private router: Router ,public route: ActivatedRoute) { }


 ngOnInit() {
   const token=localStorage.getItem('token');
   this.decoded = jwt_decode(token);
   this.user=this.decoded.result;

   this.id_carte = this.route.snapshot.params.id1;
   this.id_part = this.route.snapshot.params.id2;
  
 }

 ionViewWillEnter() {
   this.nom="promotions"
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
 openPromo(url:string){
  window.open(url);
}

gotoDetail(){
  this.router.navigate(['main/home/detailcard/'+this.id_carte+'/'+this.id_part]);

}
}

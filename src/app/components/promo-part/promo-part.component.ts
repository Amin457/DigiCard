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
  // eslint-disable-next-line @typescript-eslint/member-ordering
  user: users ;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  id_carte: number;

  // eslint-disable-next-line @typescript-eslint/naming-convention
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
   this.promoService.getPromoByPart(this.id_part).subscribe(
     (res)  => {
       if(res.success===1){
       this.promos=res.data;
       this.nom=this.promos[0].nom;
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

}

import { Component, OnInit } from '@angular/core';
import { Partenaire } from 'src/app/model/partenaire';
import { Promo } from 'src/app/model/promo';
import { PromotionService } from 'src/app/services/promotion.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss'],
})
export class PromotionComponent implements OnInit {
  promos: Promo[]=[] ;
  imgUrl = environment.Api + 'api/files/get/';
  Search ='';
  part : Partenaire[]=[];
  constructor(private promoService: PromotionService) { }

  ngOnInit() {
   
  }
  ionViewWillEnter() {

    this.promoService.getAllPromo().subscribe(
      (res)  => {
        if(res.success===1){
        this.promos=res.data;
        this.part=res.data1;
        console.log(res);
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

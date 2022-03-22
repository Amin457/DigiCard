import { Component, OnInit } from '@angular/core';
import { Promo } from 'src/app/model/promo';
import { PromotionService } from 'src/app/services/promotion.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss'],
})
export class PromotionComponent implements OnInit {
  promos: Promo[]=[] ;
  constructor(private promoService: PromotionService) { }

  ngOnInit() {
    this.promoService.getAllPromo().subscribe(
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

}
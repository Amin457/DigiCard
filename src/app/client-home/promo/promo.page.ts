import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Promo } from 'src/app/model/promo';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.page.html',
  styleUrls: ['./promo.page.scss'],
})
export class PromoPage implements OnInit {
  promos: Promo[]=[] ;
  constructor( public httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get<any>('http://localhost:3000/api/promotions').subscribe(
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

import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.scss']
})
export class VenteComponent implements OnInit {


  public categories = [];
  public featuredProducts = [];
  public bestSellProducts = [];

  constructor(  private data: DataService,) {
  
  }

  ngOnInit() {
    this.categories = this.data.getCategories();
    this.featuredProducts = this.data.getFeaturedProducts();
    this.bestSellProducts = this.data.getBestSellProducts();
  }

}

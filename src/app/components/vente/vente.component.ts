import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.scss']
})
export class VenteComponent implements OnInit {

	highlights = [];
  public categories = [];
  public featuredProducts = [];
  public bestSellProducts = [];

  constructor(  private data: DataService,private http: HttpClient) {
  
  }

  ngOnInit() {
    this.categories = this.data.getCategories();
    this.featuredProducts = this.data.getFeaturedProducts();
    this.bestSellProducts = this.data.getBestSellProducts();
    this.http.get('https://devdactic.fra1.digitaloceanspaces.com/foodui/home.json')
    .subscribe((res: any) => {
      this.highlights = res.highlights;
    });
  }
  highlightSlideOpts = {
		slidesPerView: 1.05,
		spaceBetween: 10,
		centeredSlides: true,
    autoplay:true,
		loop: true
	};
}

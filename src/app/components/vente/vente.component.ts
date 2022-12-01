import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.scss']
})
export class VenteComponent implements OnInit {

  config: SwiperOptions = {
    slidesPerView: 2.3,
    spaceBetween: 20
  };
  configPopular: SwiperOptions = {
    slidesPerView: 1.8,
    spaceBetween: 10
  };
  constructor() {}

  ngOnInit() {
  }

}

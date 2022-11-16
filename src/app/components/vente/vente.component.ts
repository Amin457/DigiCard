/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import SwiperCore, {  Keyboard, Pagination, SwiperOptions, Zoom, EffectCreative } from 'swiper';
SwiperCore.use([Zoom, EffectCreative]);
@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.css']
})
export class VenteComponent implements OnInit {
  Search = '';
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

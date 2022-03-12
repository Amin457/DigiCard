import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  back: boolean;

  constructor(public router: Router) { }

  ngOnInit() {
   /* const data = this.router.url.split('/');
    console.log(data);
    if(data[1] == 'home') this.back = true;
    else this.back = false;*/
  }

}

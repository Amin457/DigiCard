import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Carte } from 'src/app/model/carte';
import { Localisation } from 'src/app/model/localisation';
import { users } from 'src/app/model/user';
import { CarteService } from 'src/app/services/carte.service';
import { LocalisationService } from 'src/app/services/localisation.service';
import jwt_decode from 'jwt-decode';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-detailcard',
  templateUrl: './detailcard.component.html',
  styleUrls: ['./detailcard.component.scss'],
})
export class DetailcardComponent implements OnInit {
   decoded: any;
   user: users ;
   // eslint-disable-next-line @typescript-eslint/naming-convention
   id_carte: number;

   // eslint-disable-next-line @typescript-eslint/naming-convention
   id_part: number;
   // eslint-disable-next-line @typescript-eslint/naming-convention
   carte1: Carte[] ;
   localisation: Localisation[];
   // eslint-disable-next-line max-len
  value: string;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  // eslint-disable-next-line max-len
  constructor(private menu: MenuController , public route: ActivatedRoute , private carteService: CarteService, private localisationService: LocalisationService) { }

  ngOnInit() {
    const token=localStorage.getItem('token');
    this.decoded = jwt_decode(token);
    this.user=this.decoded.result;

    this.id_carte = this.route.snapshot.params.id1;
    this.id_part = this.route.snapshot.params.id2;
    console.log('cart',this.id_carte);

    this.carteService.getCarteById(this.user.id,this.id_carte).subscribe(
    (res)  => {
      console.log(res);
      this.carte1 = res.data;
      console.log(this.carte1);
    },
    error => {
      console.log(error);
    });

    this.localisationService.getLocalisations(this.id_part).subscribe(
      (res)  => {
        console.log(res);
        this.localisation = res.data;
        console.log(this.localisation);
      },
      error => {
        console.log(error);
      });
    // eslint-disable-next-line max-len
    }
// eslint-disable-next-line @typescript-eslint/naming-convention
onClick1(url: string){
  window.open(url,'_system');
}

openFirst() {
  this.menu.enable(true, 'first');
  this.menu.open('first');
}

openEnd() {
  this.menu.open('end');
}

openCustom() {
  this.menu.enable(true, 'custom');
  this.menu.open('custom');
}

}

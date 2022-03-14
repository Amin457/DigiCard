import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Carte } from 'src/app/model/carte';
import { CarteService } from 'src/app/services/carte.service';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.page.html',
  styleUrls: ['./detail-card.page.scss'],
})
export class DetailCardPage implements OnInit {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  id_carte: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  id_client: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  carte1: Carte[]=[] ;
  // eslint-disable-next-line max-len
 value: string;
  constructor(public route: ActivatedRoute , private carteService: CarteService) { }

  ngOnInit() {
    this.id_carte = this.route.snapshot.params.id_carte;
    this.id_client = this.route.snapshot.params.id;
    console.log(this.id_client);
    console.log(this.id_carte);
    this.carteService.getCarteById(this.id_client,this.id_carte).subscribe(
      (res)  => {
        console.log(res);
        this.carte1 = res.data;
        console.log(this.carte1);
        console.log(this.carte1);
      },
      error => {
        console.log(error);
      });
  }

}

import { Component,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Carte } from 'src/app/model/carte';
import { Localisation } from 'src/app/model/localisation';
import { CarteService } from 'src/app/services/carte.service';
import { LocalisationService } from 'src/app/services/localisation.service';


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
  id_part: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  carte1: Carte[] ;
  localisation: Localisation[];
  // eslint-disable-next-line max-len
 value: string;
 // eslint-disable-next-line @typescript-eslint/member-ordering

  constructor(public route: ActivatedRoute , private carteService: CarteService, private localisationService: LocalisationService) {
  }


  ngOnInit(): void {
    this.id_carte = this.route.snapshot.params.id_carte;
    this.id_client = this.route.snapshot.params.id;

    this.carteService.getCarteById(this.id_client,this.id_carte).subscribe(
      (res)  => {
        console.log(res);
        this.carte1 = res.data;
        console.log(this.carte1);
      },
      error => {
        console.log(error);
      });

      this.id_part = this.route.snapshot.params.id_part;
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
  }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Localisation } from 'src/app/model/localisation';
import { LocalisationService } from 'src/app/services/localisation.service';

@Component({
  selector: 'app-localisation',
  templateUrl: './localisation.component.html',
  styleUrls: ['./localisation.component.scss'],
})
export class LocalisationComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  id_part: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  id_carte: number;
  localisation: Localisation[];
  constructor(private router: Router ,public route: ActivatedRoute , private localisationService: LocalisationService) { }

  ngOnInit() {
    this.id_carte = this.route.snapshot.params.id1;
    this.id_part = this.route.snapshot.params.id2;

    this.localisationService.getLocalisations(this.id_part).subscribe(
      (res)  => {
        console.log(res);
        this.localisation = res.data;
        console.log(this.localisation);
      },
      error => {
        console.log(error);
      });
  }

  onClick1(url: string){
    window.open(url,'_system');
  }

  gotoDetail(){
    this.router.navigate(['main/home/detailcard/'+this.id_carte+'/'+this.id_part]);

  }
}

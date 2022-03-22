/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit ,ElementRef ,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Carte } from 'src/app/model/carte';
import { users } from 'src/app/model/user';
import { CarteService } from 'src/app/services/carte.service';
import jwt_decode from 'jwt-decode';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detailcard',
  templateUrl: './detailcard.component.html',
  styleUrls: ['./detailcard.component.scss'],
})
export class DetailcardComponent implements OnInit {
  [x: string]: any;
   // eslint-disable-next-line @typescript-eslint/member-ordering
   decoded: any;
   // eslint-disable-next-line @typescript-eslint/member-ordering
   user: users ;
   // eslint-disable-next-line @typescript-eslint/naming-convention
   id_carte: number;

   // eslint-disable-next-line @typescript-eslint/naming-convention
   id_part: number;
   // eslint-disable-next-line @typescript-eslint/naming-convention
   carte1: Carte[] ;
   // eslint-disable-next-line max-len
  value: string;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  // eslint-disable-next-line max-len
  segmentValue = '1';

  type = true;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private _CANVAS: any;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private _CONTEXT: any;
  @ViewChild('canvas') canvasEl: ElementRef;
  // eslint-disable-next-line max-len
  constructor(private router: Router ,public route: ActivatedRoute , private carteService: CarteService,private toastCtrl: ToastController) { }

  segmentChanged(event) {
    this.segmentValue = event.detail.value;
  }

  ngOnInit() {
    const token=localStorage.getItem('token');
    this.decoded = jwt_decode(token);
    this.user=this.decoded.result;

    this.id_carte = this.route.snapshot.params.id1;
    this.id_part = this.route.snapshot.params.id2;

    this.carteService.getCarteById(this.user.id,this.id_carte).subscribe(
    (res)  => {
      this.carte1 = res.data;
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

rec(){
  this.router.navigate(['main/home/detailcard/'+this.id_carte+'/'+this.id_part+'/reclamation']);
}
feed(){
  this.router.navigate(['main/home/detailcard/'+this.id_carte+'/'+this.id_part+'/feedback']);
}
localisations(){
  this.router.navigate(['main/home/detailcard/'+this.id_carte+'/'+this.id_part+'/localisation']);
}
}

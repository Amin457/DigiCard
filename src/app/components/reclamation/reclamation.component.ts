import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { Reclamation } from 'src/app/model/reclamation';
import { users } from 'src/app/model/user';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss'],
})
export class ReclamationComponent implements OnInit {
 // eslint-disable-next-line @typescript-eslint/naming-convention
 id_part: number;
 // eslint-disable-next-line @typescript-eslint/naming-convention
 id_carte: number;
 form: FormGroup;
 // eslint-disable-next-line @typescript-eslint/naming-convention
 Rec: string;
 choix: string;
 rec: Reclamation=new Reclamation();
 user: users ;
  decoded: any;
  // eslint-disable-next-line max-len
  constructor(private router: Router,public route: ActivatedRoute ,  public toastController: ToastController ,private reclamationService: ReclamationService ) { }

  ngOnInit() {
    this.id_carte = this.route.snapshot.params.id1;
    this.id_part = this.route.snapshot.params.id2;
    const token=localStorage.getItem('token');
    this.decoded = jwt_decode(token);
    this.user=this.decoded.result;
  }

  gotoDetail(){
    this.router.navigate(['main/home/detailcard/'+this.id_carte+'/'+this.id_part]);
}
sendRec(){
  if(this.choix===undefined || this.Rec===undefined ){
    this.toastController.create({
      message: 'il faut que vous remplir tous le formuliare !',
      position: 'bottom',
      cssClass: 'toast-custom-class',
      buttons: [
        {
          side: 'end',
          handler: () => {
            console.log('');
          }
        }, {
          side: 'end',
          text: 'fermer',
          role: 'cancel',
          handler: () => {
            console.log('');
          }
        }
      ]
    }).then((toast) => {
      toast.present();
    });
  }else{
  this.rec.id_client=this.user.id;
  this.rec.id_part=this.id_part;
  this.rec.sujet_rec=this.choix;
  this.rec.description=this.Rec;

  this.reclamationService.createRec(this.rec).subscribe(
    (res)  => {
      this.toastController.create({
        message: 'reclamation a bien recue',
        position: 'bottom',
        cssClass: 'toast-custom-class',
        buttons: [
          {
            side: 'end',
            handler: () => {
              console.log('');
            }
          }, {
            side: 'end',
            text: 'fermer',
            role: 'cancel',
            handler: () => {
              console.log('');
            }
          }
        ]
      }).then((toast) => {
        toast.present();
      });
    },
    error => {
      console.log(error);
    });
}
}
}


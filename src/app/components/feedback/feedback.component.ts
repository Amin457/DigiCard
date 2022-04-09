import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonRadioGroup } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Feedback } from 'src/app/model/feedback';
import { users } from 'src/app/model/user';
import { FeedbackService } from 'src/app/services/feedback.service';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  id_part: number;
  id_carte: number;
  Q1: string;
  Q2: string;
  Q3: string;
  Q4: string;
  Q5: string;
  selectedRadioGroup: any;
  feed: Feedback=new Feedback();
  decoded: any;
  user: users ;
  constructor(private router: Router,public route: ActivatedRoute, public toastController: ToastController , private feedbackService: FeedbackService) { }

  ngOnInit() {
    this.id_carte = this.route.snapshot.params.id1;
    this.id_part = this.route.snapshot.params.id2;
    console.log(this.id_part);
    const token=localStorage.getItem('token');
    this.decoded = jwt_decode(token);
    this.user=this.decoded.result;
  }

  gotoDetail(){
    this.router.navigate(['main/home/detailcard/'+this.id_carte+'/'+this.id_part]);
}

  onSubmit(){
   if(this.Q1===undefined || this.Q2===undefined || this.Q3===undefined || this.Q4===undefined || this.Q5===undefined){
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
      this.feed.id_part=this.id_part;
      this.feed.id_client=this.user.id;
      this.feed.Q1=this.Q1.toString();
      this.feed.Q2=this.Q2.toString();
      this.feed.Q3=this.Q3.toString();
      this.feed.Q4=this.Q4.toString();
      this.feed.Q5=this.Q5.toString();

      this.feedbackService.createFeed(this.feed).subscribe(
        (res)  => {
          this.toastController.create({
            message: 'merci pour votre feedback',
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



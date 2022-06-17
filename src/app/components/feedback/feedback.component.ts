import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonRadioGroup } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Feedback } from 'src/app/model/feedback';
import { users } from 'src/app/model/user';
import { FeedbackService } from 'src/app/services/feedback.service';
import jwt_decode from 'jwt-decode';
import { Quest } from 'src/app/model/question';
import { Rep } from 'src/app/model/reponse';
import { IonSlides} from '@ionic/angular';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  @ViewChild('mySlider')  slides: IonSlides;

  swipeNext(){
    this.slides.slideNext();
  }
  p:number;
  Quest : Quest[];
  Rep : Rep[] ;
  id_part: number;
  id_carte: number;
 
  selectedRadioGroup: any;
  feed: Feedback=new Feedback();
  decoded: any;
  user: users ;
  Q1: number;
  constructor(private alertCtrl: AlertController,private router: Router,public route: ActivatedRoute, public toastController: ToastController , private feedbackService: FeedbackService) { }
  async presentAlert(msg : string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  ngOnInit() {
    this.id_carte = this.route.snapshot.params.id1;
    this.id_part = this.route.snapshot.params.id2;
    console.log(this.id_part);
    const token=localStorage.getItem('token');
    this.decoded = jwt_decode(token);
    this.user=this.decoded.result;


       this.feedbackService.getAllQuestion(this.id_part).subscribe(
      (res)  => {
        console.log("qqqqqqqqq",res.question);
        this.Quest=res.question;
        this.p=this.Quest.length;
        console.log("p",this.p)
        console.log("rrrrrrr",res.reponse);
        this.Rep=res.reponse;
           
        
        console.log('rrrrrrrrrrrrrrrr',this.Quest);    

      },
      error => {
        console.log(error);
      }); 
  }

  gotoDetail(){
    this.router.navigate(['main/home/detailcard/'+this.id_carte+'/'+this.id_part]);
}

  onSubmit(id_question : number,i : number){
   if(this.Q1===undefined){
    this.presentAlert("Ajouter votre réponse");
    }else{
      console.log(this.Q1.toString(),id_question);
      this.swipeNext();
      this.feed.id_part=this.id_part;
      this.feed.id_client=this.user.id;
      this.feed.id_question=id_question;
      this.feed.id_rep=this.Q1;

      this.feedbackService.createFeed(this.feed).subscribe(
        (res)  => {
          this.Q1=undefined;
          if(((i+1)/this.p==1)){
            this.presentAlert("Merci pour votre feedback");
          }
        },
        error => {
          console.log(error);
        });
    }
  
  }
}



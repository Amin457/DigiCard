import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Carte } from 'src/app/model/carte';
import { users } from 'src/app/model/user';
import { CarteService } from 'src/app/services/carte.service';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';
import { PromotionService } from 'src/app/services/promotion.service';
import { Promo } from 'src/app/model/promo';
import { IonSlides } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { notif } from 'src/app/model/notif';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  decoded: any;
  imgUrl = environment.Api + 'api/files/get/';
  Search ='';
  id: number;
  user: users ;
  cartes: Carte[]=[] ;
  promos: Promo[]=[] ;
  message : string;
  slideOpts = {
    initialSlide: 1,
    speed: 300
  };
 tok : string;
 notif : notif= new notif ();
  constructor(private promoService: PromotionService , private userService: UserService, private router: Router , public route: ActivatedRoute , private carteService: CarteService, public navCtrl: NavController) { }
  slidesDidLoad(slides: IonSlides): void {
    slides.startAutoplay();
  }
  ngOnInit() {
    const token=localStorage.getItem('token');
    this.decoded = jwt_decode(token);
    this.user=this.decoded.result;

      this.carteService.getAllCartes(this.user.id).subscribe(
        (res)  => {
          console.log(res.message);
          this.message=res.message;
          this.cartes = res.data;        
        },
        error => {
          console.log(error);
        });

        


        this.promoService.getAllPromo().subscribe(
          (res)  => {
            if(res.success===1){
            this.promos=res.data;
            console.log(this.promos);
            return false;
          }else{
            console.log(res.data);
          }
          }
          ,
          error => {
            console.log(error);
          });
      /////////////////////////////////////
      console.log('Initializing HomePage');

      // Request permission to use push notifications
      // iOS will prompt user and return if they granted permission or not
      // Android will just grant without prompting
      PushNotifications.requestPermissions().then(result => {
        if (result.receive === 'granted') {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
        }
      });
  
      // On success, we should be able to receive notifications
      PushNotifications.addListener('registration',
        (token: Token) => {
          //alert('Push registration success, token: ' + token.value);
          this.tok=token.value;

          this.notif.token=token.value;
          this.notif.id_client=this.user.id;
          this.userService.registerNotif(this.notif).subscribe(
            (res)  => {
             console.log(res);
            },
            error => {
              console.log(error);
            });
        }
      );
  
      // Some issue with our setup and push will not work
      PushNotifications.addListener('registrationError',
        (error: any) => {
          //alert('Error on registration: ' + JSON.stringify(error));
        }
      );
  
      // Show us the notification payload if the app is open on our device
      PushNotifications.addListener('pushNotificationReceived',
        (notification: PushNotificationSchema) => {
          alert('Push received: ' + JSON.stringify(notification));
        }
      );
  
      // Method called when tapping on a notification
      PushNotifications.addListener('pushNotificationActionPerformed',
        (notification: ActionPerformed) => {
          alert('Push action performed: ' + JSON.stringify(notification));
        }
      );    
    }



    logOut(){
      localStorage.removeItem('token');
      this.router.navigate(['']);
    }
    goto(id1: number,id2: number){
      this.router.navigate(['main/home/detailcard/'+id1+'/'+id2]);
    }

    gotoadd(){
      this.router.navigate(['main/newcard']);
    }
    gotoNotif(){
      this.router.navigate(['main/notifications']);
    }

    
}

import { Component, OnInit ,ElementRef, Renderer2, ViewChild} from '@angular/core';
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
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild("header") header: HTMLElement;
  decoded: any;
  imgUrl = environment.Api + 'api/files/get/';
  Search ='';
  id: number;
  nbr: number;
  user: users ;
  cartes: Carte[]=[] ;
  promos: Promo[]=[] ;
  message : string;
  slideOpts = {
    initialSlide: 1,
    speed: 300
  };
 notif : notif= new notif ();
  constructor( public element: ElementRef, 
    public renderer: Renderer2,
    private notificationService: NotificationService,
    private promoService: PromotionService , private userService: UserService, private router: Router , public route: ActivatedRoute , private carteService: CarteService, public navCtrl: NavController) { }
  slidesDidLoad(slides: IonSlides): void {
    slides.startAutoplay();
  }


  ngOnInit() {
    const token=localStorage.getItem('token');
    this.decoded = jwt_decode(token);
    this.user=this.decoded.result;

          


       
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
          //alert('notification: '  + JSON.stringify(notification.title) + JSON.stringify(notification.body));
        }
      );
  
      
      // Method called when tapping on a notification
      PushNotifications.addListener('pushNotificationActionPerformed',
        (notification: ActionPerformed) => {
          //alert('Push action performed: ' + JSON.stringify(notification));
        }
      );    
    }

    ionViewWillEnter() {
      this.renderer.setStyle(this.header['el'], 'webkitTransition', 'top 700ms');
      this.carteService.getAllCartes(this.user.id).subscribe(
        (res)  => {
          this.message=res.message;
          this.cartes = res.data; 
          console.log(this.cartes);       
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

    const token=localStorage.getItem('token');
    this.decoded = jwt_decode(token);
    this.user=this.decoded.result;
    this.notificationService.nbrNotif(this.user.id).subscribe(
      (res)  => {
        this.nbr=res.data.nbr;
      }
      ,
      error => {
        console.log(error);
      });

  }

    logOut(){
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      window.location.reload();

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

    onContentScroll(event) {
      if (event.detail.scrollTop >= 50) {
        this.renderer.setStyle(this.header['el'], 'top', '-30%');
      } else {
        this.renderer.setStyle(this.header['el'], 'top', '0px');
      }
    }

    desactiver(){
      console.log("mrigl");
    }
}

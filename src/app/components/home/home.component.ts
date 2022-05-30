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
  userHome:users=new users();
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
  
    }

  async  ionViewWillEnter() {
      const token1=localStorage.getItem('token');
      this.decoded = jwt_decode(token1);
      this.user=this.decoded.result;
     await this.userService.getUserById(this.user.id).subscribe(
        (res)  => {
          this.userHome=res.data;
          console.log(this.userHome);
        }
        ,
        error => {
          console.log(error);
        });

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
    const token=localStorage.getItem('token');
    this.decoded = jwt_decode(token);
    this.user=this.decoded.result;
      localStorage.removeItem('token');
      this.userService.deleteToken(this.user.id).subscribe(
        (res)  => {
          console.log("deleted");
        }
        ,
        error => {
          console.log(error);
        });
  
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
        ////-30
        this.renderer.setStyle(this.header['el'], 'top', '-20%');
      } else {
        this.renderer.setStyle(this.header['el'], 'top', '0px');
      }
    }

   
}

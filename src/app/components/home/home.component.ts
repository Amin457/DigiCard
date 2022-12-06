import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, IonRouterOutlet, NavController } from '@ionic/angular';
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
  Search = '';
  id: number;
  nbr: number;
  user: users;
  userHome: users = new users();
  cartes: Carte[] = [];
  cartesDesac: Carte[] = [];
  promos: Promo[] = [];
  message: string;
  slideOpts = {
    initialSlide: 1,
    speed: 300
  };
  notif: notif = new notif();
  isOpen = false;
  constructor(
    private alertCtrl: AlertController, public routerOutlet: IonRouterOutlet,
    private actionSheetCtrl: ActionSheetController,
    public element: ElementRef,
   // public renderer: Renderer2,
    private notificationService: NotificationService,
    private promoService: PromotionService, private userService: UserService, private router: Router, public route: ActivatedRoute, private carteService: CarteService, public navCtrl: NavController) { }
  slidesDidLoad(slides: IonSlides): void {
    slides.startAutoplay();
  }


  ngOnInit() {

  }

  async ionViewWillEnter() {
    const token1 = localStorage.getItem('token');
    this.decoded = jwt_decode(token1);
    this.user = this.decoded.result;
    await this.userService.getUserById(this.user.id).subscribe(
      (res) => {
        this.userHome = res.data;
        console.log(this.userHome);
      }
      ,
      error => {
        console.log(error);
      });

   // this.renderer.setStyle(this.header['el'], 'webkitTransition', 'top 700ms');
    this.carteService.getAllCartes(this.user.id).subscribe(
      (res) => {
        this.message = res.message;
        this.cartes = res.data;
        console.log(this.cartes,'cartessss');
      },
      error => {
        console.log(error);
      });

    this.carteService.carteDesactivé(this.user.id).subscribe(
      (res) => {
        this.cartesDesac = res.data;
        console.log('kkkkk', res);
      },
      error => {
        console.log(error);
      });

    this.promoService.getAllPromo().subscribe(
      (res) => {
        if (res.success === 1) {
          this.promos = res.data;
          console.log(this.promos);
          return false;
        } else {
          console.log(res.data);
        }
      }
      ,
      error => {
        console.log(error);
      });

    const token = localStorage.getItem('token');
    this.decoded = jwt_decode(token);
    this.user = this.decoded.result;
    this.notificationService.nbrNotif(this.user.id).subscribe(
      (res) => {
        this.nbr = res.data.nbr;
      }
      ,
      error => {
        console.log(error);
      });


  }

  logOut() {
    const token = localStorage.getItem('token');
    this.decoded = jwt_decode(token);
    this.user = this.decoded.result;
    localStorage.removeItem('token');
    this.userService.deleteToken(this.user.id).subscribe(
      (res) => {
        console.log("deleted");
      }
      ,
      error => {
        console.log(error);
      });

    this.router.navigate(['/login']);
    window.location.reload();

  }
  goto(id1: number, id2: number) {
    this.router.navigate(['main/home/detailcard/' + id1 + '/' + id2]);
  }

  gotoadd() {
    this.router.navigate(['main/newcard']);
  }
  gotoNotif() {
    this.router.navigate(['main/notifications']);
  }

  // onContentScroll(event) {
  //   if (event.detail.scrollTop >= 50) {
  //     ////-30
  //     this.renderer.setStyle(this.header['el'], 'top', '-23%');
  //   } else {
  //     this.renderer.setStyle(this.header['el'], 'top', '0px');
  //   }
  // }    (ionScroll)='onContentScroll($event)'


  closeModel() {
    this.isOpen = !this.isOpen;
  }





  activerCarte(etat: number, id_carte: number) {
    console.log("closeCard");
    this.presentConfirm(etat, id_carte);
  }

  async presentConfirm(etat: number, id_carte: number) {
    let alert = await this.alertCtrl.create({
      message: 'voulez-vous activer cette carte ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log('this.carte1[0]');
          }
        },
        {
          text: 'Oui',
          handler: () => {
            console.log('Oui clicked');

            this.carteService.deleteCarte(id_carte, etat).subscribe(
              (res) => {
                console.log(res);
                

                this.carteService.getAllCartes(this.user.id).subscribe(
                  (res) => {
                    this.message = res.message;
                    this.cartes = res.data;
                    console.log(this.cartes);
                  },
                  error => {
                    console.log(error);
                  });

                this.carteService.carteDesactivé(this.user.id).subscribe(
                  (res) => {
                    this.cartesDesac = res.data;
                    console.log('kkkkk', res);
                  },
                  error => {
                    console.log(error);
                  });
              },
              error => {
                console.log(error);
              });
          }
        }
      ]
    });
    alert.present();
  }
}




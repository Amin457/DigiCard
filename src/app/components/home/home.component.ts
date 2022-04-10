import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Carte } from 'src/app/model/carte';
import { users } from 'src/app/model/user';
import { CarteService } from 'src/app/services/carte.service';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';
import SwiperCore, { SwiperOptions, Autoplay, Pagination } from 'swiper';
import { PromotionService } from 'src/app/services/promotion.service';
import { Promo } from 'src/app/model/promo';
SwiperCore.use([Autoplay, Pagination]);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  decoded: any;
  imgUrl = 'http://localhost:3000/api/files/get/';
  id: number;
  user: users ;
  cartes: Carte[]=[] ;
  promos: Promo[]=[] ;
  Search ='';
  bannerConfig: SwiperOptions;

  constructor(private promoService: PromotionService , private userService: UserService, private router: Router , public route: ActivatedRoute , private carteService: CarteService, public navCtrl: NavController) { }

  ngOnInit() {
    const token=localStorage.getItem('token');
    this.decoded = jwt_decode(token);
    this.user=this.decoded.result;

      this.carteService.getAllCartes(this.user.id).subscribe(
        (res)  => {
        console.log(res);
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

            this.bannerConfig = {
              slidesPerView: 1.2,
              spaceBetween: 10,
              centeredSlides: true,
              autoplay: {
                delay: 3000
              }
            };
          
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

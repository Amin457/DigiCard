import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Carte } from '../model/carte';
import { users } from '../model/user';
import { CarteService } from '../services/carte.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.page.html',
  styleUrls: ['./client-home.page.scss'],
})
export class ClientHomePage implements OnInit {
  id: number;
  user: users = new users();
  cartes: Carte[]=[] ;
  // eslint-disable-next-line max-len
  constructor( private router: Router , public route: ActivatedRoute , public httpClient: HttpClient , private carteService: CarteService, public navCtrl: NavController) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;


    console.log(this.id);
    this.httpClient.get<any>('http://localhost:3000/api/users/'+this.id).subscribe(
      (res)  => {
        if(res.success===1){
        this.user=res.data;
        console.log(this.user);
        return false;
      }else{
        console.log(res.data);
      }
      }
      ,
      error => {
        console.log(error);
      });

      this.carteService.getAllCartes(this.id).subscribe(
        (res)  => {
        console.log(res);
          this.cartes = res.data;
          console.log(this.cartes);
        },
        error => {
          console.log(error);
        });
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    onClick(id_carte: number){
      /*this.router.navigate(['detail-card/'+id_carte]);*/
      /*this.navCtrl.navigateRoot('/detail-card');*/
      console.log(id_carte);
    }


  }



import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Carte } from '../model/carte';
import { users } from '../model/user';
import { CarteService } from '../services/carte.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.page.html',
  styleUrls: ['./client-home.page.scss'],
})
export class ClientHomePage implements OnInit {
  id: number;
  user: users = new users();
  cartes: Carte[]=[] ;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Search ='';
  // eslint-disable-next-line max-len
  constructor( private userService: UserService, private router: Router , public route: ActivatedRoute , public httpClient: HttpClient , private carteService: CarteService, public navCtrl: NavController) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.userService.getUserById(this.id).subscribe(
      (res)  => {
      console.log(res);
        this.user = res.data;
        console.log(this.user);
      },
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
  }



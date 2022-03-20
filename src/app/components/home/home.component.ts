import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Carte } from 'src/app/model/carte';
import { users } from 'src/app/model/user';
import { CarteService } from 'src/app/services/carte.service';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  decoded: any;
  id: number;
  user: users ;
  cartes: Carte[]=[] ;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Search ='';
  // eslint-disable-next-line max-len
  constructor( private userService: UserService, private router: Router , public route: ActivatedRoute , private carteService: CarteService, public navCtrl: NavController) { }

  ngOnInit() {
    const token=localStorage.getItem('token');
    this.decoded = jwt_decode(token);
    this.user=this.decoded.result;

      this.carteService.getAllCartes(this.user.id).subscribe(
        (res)  => {
        console.log(res);
          this.cartes = res.data;
          console.log(this.cartes);
        },
        error => {
          console.log(error);
        });
    }
    logOut(){
      localStorage.removeItem('token');
      this.router.navigate(['']);
    }
    goto(id1: number,id2: number){
      /*this.router.navigate([`detailcard/${id}`]);*/
      this.router.navigate(['main/home/detailcard/'+id1+'/'+id2]);
    }

    gotoadd(){
      this.router.navigate(['main/newcard']);
    }
    gotoNotif(){
      this.router.navigate(['main/notifications']);
    }
}

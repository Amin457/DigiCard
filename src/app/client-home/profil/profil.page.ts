import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { users } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  id: number;
  user: users = new users();
  constructor(public route: ActivatedRoute , public httpClient: HttpClient, private userService: UserService) { }

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
  }
  }


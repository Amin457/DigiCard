import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import jwt_decode from 'jwt-decode';
import { users } from 'src/app/model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  user: users ;
  allNotif : any ;
  decoded : any ;
  constructor(private router: Router ,private notificationService: NotificationService) { }

  ngOnInit() {}
  ionViewWillEnter() {
  const token=localStorage.getItem('token');
  this.decoded = jwt_decode(token);
  this.user=this.decoded.result;
  this.notificationService.getAllNotif(this.user.id).subscribe(
    (res)  => {
      this.allNotif=res.data;
      console.log(this.allNotif);

    }
    ,
    error => {
      console.log(error);
    });
  }
  promopart(){
    this.router.navigate(['/main/promotion']);
  }
  callFunction(){
    alert("ok");
  }
}

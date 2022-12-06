import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UtilService } from 'src/app/services/util.service';
import { menuController } from '@ionic/core';
import { IonTabs, Platform } from '@ionic/angular';
import jwt_decode from 'jwt-decode';
import { users } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  decoded: any;
  @ViewChild('tabs', {static: false}) tabs: IonTabs;
  selectedTab: any;
  user: users;
  setCurrentTab() {
    this.selectedTab = this.tabs.getSelected();
  }
  public isMenuEnabled:boolean = true;
  public selectedIndex = 0;

  constructor( 
    private userService: UserService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private util: UtilService,
    private router: Router,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.selectedIndex = 1;
    
    this.util.getMenuState().subscribe(menuState => {
      this.isMenuEnabled = menuState;
    });
  }

  navigate(path, selectedId) {
    this.selectedIndex = selectedId;
    this.router.navigate([path]);
  }

  close() {
    menuController.toggle();
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
}

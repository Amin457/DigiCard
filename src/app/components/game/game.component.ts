import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { users } from 'src/app/model/user';
import jwt_decode from 'jwt-decode';
import { CadeauService } from 'src/app/services/cadeau.service';
import { cadeau } from 'src/app/model/cadeau';
import { recompense } from 'src/app/model/recompense';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {

  @ViewChild('myCanvas', { static: false }) myCanvas: ElementRef;
  blocked: boolean;
  cadeau: any[] = [];
  user: users;
  id_part: number;
  id_carte: number;
  decoded: any;
  startAngle = 0;
  spinTime = 0;
  spinTimeTotal = 0;

  ctx;
  spinTimeout = null;

  spinAngleStart;
  arc: number;
  spinArcStart: number;
  cad: recompense = new recompense();
  recom: any[];
  constructor(public toastController: ToastController, private cadeauService: CadeauService, private router: Router, public route: ActivatedRoute) {

  }



  ngAfterViewInit(): void {
    this.id_carte = this.route.snapshot.params.id1;
    this.id_part = this.route.snapshot.params.id2;
    console.log(this.id_part);
    const token = localStorage.getItem('token');
    this.decoded = jwt_decode(token);
    this.user = this.decoded.result;



    this.cadeauService.getCadeau(this.id_part).subscribe(
      (res) => {
        console.log(res);
        this.cadeau = res.data;
        this.arc = 2 * Math.PI / this.cadeau.length;
        this.spinArcStart = this.cadeau.length;
        this.draw();

      },
      error => {
        console.log(error);
      });

  }

  ionViewWillEnter() {
    this.cadeauService.getRecompense(this.user.id, this.id_part).subscribe(
      (res) => {
        this.recom = res.results;

      },
      error => {
        console.log(error);
      });

    this.cadeauService.getEtatJeux(this.id_part).subscribe(
      (res) => {
        console.log(res.data)
        if (res.data.etat_jeu == 1) {
          console.log("jeux activé");
          this.blocked = false;

        } else {
          this.blocked = true;
        }
      },
      error => {
        console.log(error);
      });
  }

  draw() {
    this.drawRouletteWheel();

  }

  byte2Hex(n) {
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
  }

  RGB2Color(r, g, b) {
    return '#' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
  }

  getColor(item, maxitem) {
    var phase = 0;
    var center = 128;
    var width = 127;
    var frequency = Math.PI * 2 / maxitem;

    let red = Math.sin(frequency * item + 2 + phase) * width + center;
    let green = Math.sin(frequency * item + 0 + phase) * width + center;
    let blue = Math.sin(frequency * item + 4 + phase) * width + center;

    return this.RGB2Color(red, green, blue);
  }
  drawRouletteWheel() {
    var canvas = document.getElementById("wheelcanvas");

    var outsideRadius = 140;
    var textRadius = 120;
    var insideRadius = 25;

    this.ctx = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
    this.ctx.clearRect(0, 0, 500, 500);


    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;

    this.ctx.font = 'bold 12px sans-serif';

    for (var i = 0; i < this.cadeau.length; i++) {
      var angle = this.startAngle + i * this.arc;
      this.ctx.fillStyle = this.getColor(i, this.cadeau.length);

      this.ctx.beginPath();
      this.ctx.arc(150, 150, outsideRadius, angle, angle + this.arc, false);
      this.ctx.arc(150, 150, insideRadius, angle + this.arc, angle, true);
      this.ctx.stroke();
      this.ctx.fill();

      this.ctx.save();
      this.ctx.shadowOffsetX = -1;
      this.ctx.shadowOffsetY = -1;
      this.ctx.shadowBlur = 0;
      //this.ctx.shadowColor   = "rgb(220,220,220)";
      this.ctx.fillStyle = "white";
      this.ctx.translate(150 + Math.cos(angle + this.arc / 2) * textRadius, 150 + Math.sin(angle + this.arc / 2) * textRadius);
      this.ctx.rotate(angle + this.arc / 2 + Math.PI / 2);
      var text = this.cadeau[i].description;
      this.ctx.fillText(text, -this.ctx.measureText(text).width / 2, 0);
      this.ctx.restore();
    }

    //Arrow
    this.ctx.fillStyle = "black";
    this.ctx.beginPath();
    this.ctx.moveTo(150 - 4, 150 - (outsideRadius + 5));
    this.ctx.lineTo(150 + 4, 150 - (outsideRadius + 5));
    this.ctx.lineTo(150 + 4, 150 - (outsideRadius - 5));
    this.ctx.lineTo(150 + 9, 150 - (outsideRadius - 5));
    this.ctx.lineTo(150 + 0, 150 - (outsideRadius - 13));
    this.ctx.lineTo(150 - 9, 150 - (outsideRadius - 5));
    this.ctx.lineTo(150 - 4, 150 - (outsideRadius - 5));
    this.ctx.lineTo(150 - 4, 150 - (outsideRadius + 5));
    this.ctx.fill();
  }

  spin() {
    //test permission au jeux
    const token = localStorage.getItem('token');
    this.decoded = jwt_decode(token);
    this.user = this.decoded.result;
    this.id_part = this.route.snapshot.params.id2;

    this.cadeauService.getPermissionJeux(this.user.id, this.id_part).subscribe(
      (res) => {
        if (res.success == 0) {
          alert(res.message + (7 - (res.results1[0].a)) + " jour(s)");
          this.blocked = false;

        } else if (res.success == 1) {
          this.blocked = false;

          this.spinAngleStart = Math.random() * this.cadeau.length + this.cadeau.length;
          this.spinTime = 0;
          this.spinTimeTotal = Math.random() * 3 + 4 * 1000;
          this.rotateWheel();
        }
      },
      error => {
        console.log(error);
      });




  }

  rotateWheel() {
    this.spinTime += 15;
    if (this.spinTime >= this.spinTimeTotal) {
      this.stopRotateWheel();
      return;
    }
    var spinAngle = this.spinAngleStart - this.easeOut(this.spinTime, 0, this.spinAngleStart, this.spinTimeTotal);
    this.startAngle += (spinAngle * Math.PI / 180);
    this.drawRouletteWheel();
    this.spinTimeout = setTimeout(() => {
      this.rotateWheel();
    }, 30);
  }

  stopRotateWheel() {
    clearTimeout(this.spinTimeout);
    var degrees = this.startAngle * 180 / Math.PI + 90;
    var arcd = this.arc * 180 / Math.PI;
    var index = Math.floor((360 - degrees % 360) / arcd);
    this.ctx.save();
    this.ctx.font = 'bold 30px sans-serif';
    var text = this.cadeau[index].description;
    var id_cad = this.cadeau[index].id_cadeau;


    //inserer le cadeau gagner dans la base
    if (text == "perdu") {
      alert("vous avez perdu");
      const token = localStorage.getItem('token');
      this.decoded = jwt_decode(token);
      this.user = this.decoded.result;
      this.id_part = this.route.snapshot.params.id2;
      this.cad.id_client = this.user.id;
      this.cad.id_cadeau = id_cad;
      this.cad.id_part = this.id_part;

      this.cadeauService.insertRecompense(this.cad).subscribe(
        (res) => {
        },
        error => {
          console.log(error);
        });
    } else {
      const token = localStorage.getItem('token');
      this.decoded = jwt_decode(token);
      this.user = this.decoded.result;
      this.id_part = this.route.snapshot.params.id2;
      this.cad.id_client = this.user.id;
      this.cad.id_cadeau = id_cad;
      this.cad.id_part = this.id_part;

      this.cadeauService.insertRecompense(this.cad).subscribe(
        (res) => {
          alert(res.message);
          this.cadeauService.getRecompense(this.user.id, this.id_part).subscribe(
            (res) => {
              this.recom = res.results;
              console.log('hhhhhhhhhhh', this.recom)

            },
            error => {
              console.log(error);
            });
        },
        error => {
          console.log(error);
        });
    }
    console.log(text);
    this.ctx.restore();
  }

  // t: current time
  // b: start value
  // c: change in value
  // d: duration

  easeOut(t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  }



  gotoDetail() {
    this.router.navigate(['main/home/detailcard/' + this.id_carte + '/' + this.id_part]);
  }
}

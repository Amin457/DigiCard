import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {

  @ViewChild('myCanvas', { static: false }) myCanvas: ElementRef;
  restaraunts = ["10dt","25 points","80 points","50dt","10dt","100 points"];

  startAngle = 0;
  arc = 2 * Math.PI / this.restaraunts.length;
  spinTimeout = null;

  spinArcStart = this.restaraunts.length;
  spinTime = 0;
  spinTimeTotal = 0;

  ctx;

  spinAngleStart;

  constructor() {

  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.draw();
  }



  draw() {
    this.drawRouletteWheel();
  }

   byte2Hex(n) {
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
  }

   RGB2Color(r,g,b) {
    return '#' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
  }

   getColor(item, maxitem) {
    var phase = 0;
    var center = 128;
    var width = 127;
    var frequency = Math.PI*2/maxitem;
    
    let red   = Math.sin(frequency*item+2+phase) * width + center;
    let green = Math.sin(frequency*item+0+phase) * width + center;
    let blue  = Math.sin(frequency*item+4+phase) * width + center;
    
    return this.RGB2Color(red,green,blue);
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

    for (var i = 0; i < this.restaraunts.length; i++) {
      var angle = this.startAngle + i * this.arc;
      this.ctx.fillStyle = this.getColor(i, this.restaraunts.length);

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
      var text = this.restaraunts[i];
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
    this.spinAngleStart = Math.random() * this.restaraunts.length + this.restaraunts.length;
    this.spinTime = 0;
    this.spinTimeTotal = Math.random() * 3 + 4 * 1000;
    this.rotateWheel();
  }

  rotateWheel() {
    this.spinTime += 20;
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
    var text = this.restaraunts[index]
    //this.ctx.fillText(text, 150 - this.ctx.measureText(text).width / 2, 150 + 10);
    console.log(text)
    this.ctx.restore();
  }

  // t: current time
  // b: start value
  // c: change in value
  // d: duration

  easeOut(t, b, c, d) {
    return c * Math.sin(t/d * (Math.PI/2)) + b;
}

}

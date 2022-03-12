import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newcard',
  templateUrl: './newcard.page.html',
  styleUrls: ['./newcard.page.scss'],
})
export class NewcardPage implements OnInit {



  segmentValue = '1';

  constructor() { }

  ngOnInit() {
  }

  segmentChanged(event) {
    console.log(event);
    this.segmentValue = event.detail.value;
  }
}

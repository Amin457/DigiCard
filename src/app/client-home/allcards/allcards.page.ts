import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-allcards',
  templateUrl: './allcards.page.html',
  styleUrls: ['./allcards.page.scss'],
})
export class AllcardsPage implements OnInit {
partenaires: any;
  constructor(public httpClient: HttpClient) {
    this.httpClient.get<any>('http://localhost:3000/api/partenaires/').subscribe(
      (res)  => {
        if(res.success===1){
        console.log(res.data);
        this.partenaires=res.data;
      }else{
        console.log('aucun partenaires');
      }
      }
      ,
      error => {
        console.log(error);
      });
   }

  ngOnInit() {
  }

}

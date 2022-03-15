import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Partenaire } from 'src/app/model/partenaire';
import { PartenaireService } from 'src/app/services/partenaire.service';
@Component({
  selector: 'app-allcards',
  templateUrl: './allcards.page.html',
  styleUrls: ['./allcards.page.scss'],
})
export class AllcardsPage implements OnInit {
partenaires: Partenaire[];
// eslint-disable-next-line @typescript-eslint/naming-convention
Search ='';
  constructor(public httpClient: HttpClient, private partenaireService: PartenaireService) {

    this.partenaireService.getAllpartenaire().subscribe(
      (res)  => {
      console.log(res);
        this.partenaires = res.data;
        console.log(this.partenaires);
      },
      error => {
        console.log(error);
      });
   }

  ngOnInit() {
  }

}

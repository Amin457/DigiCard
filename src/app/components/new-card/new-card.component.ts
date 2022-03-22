import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Partenaire } from 'src/app/model/partenaire';
import { PartenaireService } from 'src/app/services/partenaire.service';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.scss'],
})
export class NewCardComponent implements OnInit {
  partenaires: Partenaire[];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Search ='';
    constructor(public httpClient: HttpClient, private partenaireService: PartenaireService, private router: Router) {

      this.partenaireService.getAllpartenaire().subscribe(
        (res)  => {
        console.log(res);
          this.partenaires = res.data;
        },
        error => {
          console.log(error);
        });
     }

    ngOnInit() {
    }

    goto(){
      this.router.navigate(['main/newcard/add-create']);
    }
}

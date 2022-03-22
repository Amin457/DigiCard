import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss'],
})
export class ReclamationComponent implements OnInit {
 // eslint-disable-next-line @typescript-eslint/naming-convention
 id_part: number;
 // eslint-disable-next-line @typescript-eslint/naming-convention
 id_carte: number;
  constructor(private router: Router,public route: ActivatedRoute) { }

  ngOnInit() {
    this.id_carte = this.route.snapshot.params.id1;
    this.id_part = this.route.snapshot.params.id2;

  }

  gotoDetail(){
    this.router.navigate(['main/home/detailcard/'+this.id_carte+'/'+this.id_part]);
}
}
